import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Auth from "../Auth/Auth";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Error from "../Error/Error";
import InformationPopup from "../InformationPopup/InformationPopup";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { urlMovies } from "../../utils/constants";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
  const [informationPopupOpenMessage, setInformationPopupMessage] =
    useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [viewsCount, setViewsCount] = useState(
    window.screen.width > 768 ? 12 : window.screen.width > 400 ? 8 : 5
  );
  const [filter, setFilter] = useState(false);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      getUser(token);
    }
  }
  function getSaved(moviesCard, savedMoviesCard) {
    setMovies(
      moviesCard.map((card) => ({
        ...card,
        saved: savedMoviesCard.find((c) => c.movieId === card.id)
          ? true
          : false,
      }))
    );
  }

  function getMovies(token) {
    Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies(token)])
      .then(([moviesCard, savedMoviesCard]) => {
        setSavedMovies(savedMoviesCard);
        getSaved(moviesCard, savedMoviesCard);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  function getUser(token) {
    mainApi
      .getUserData(token)
      .then((userData) => {
        setCurrentUser(userData);
        getMovies(token);
        setLoggedIn(true);
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        history.push("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignUp(data) {
    setIsLoading(true);
    mainApi
      .register(data)
      .then(() => {
        setInformationPopupMessage("Вы успешно зарегистрировались");
        history.push("/signin");
      })
      .catch(() => {
        setInformationPopupMessage("Произошла ошибка при регистрации");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignIn({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        getUser(res.token);
        setInformationPopupMessage("Вы успешно авторизировались");
      })
      .catch(() => {
        setInformationPopupMessage("Произошла ошибка при авторизации");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdate(user) {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    mainApi
      .editUser(user, token)
      .then((res) => {
        setCurrentUser(res);
        setInformationPopupMessage("Вы успешно изменили данные");
      })
      .catch(() => {
        setInformationPopupMessage("Произошла ошибка при обновлении данных");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/");
  }

  function handleMore() {
    setViewsCount(viewsCount + 3);
  }

  //Обработчик сохранения фильма в избранное
  function handleSaveMovie({
    id,
    saved,
    updated_at,
    image,
    created_at,
    trailerLink,
    ...keys
  }) {
    const token = localStorage.getItem("token");
    const poster = urlMovies + image?.url || "";
    const data = {
      image: poster,
      trailer: trailerLink,
      thumbnail: poster,
      movieId: id,
      ...keys,
    };
    mainApi
      .saveMovie(data, token)
      .then((res) => {
        const savedCards = [...savedMovies, res];
        setSavedMovies(savedCards);
        getSaved(movies, savedCards);
      })
      .catch(() => {
        setInformationPopupMessage("Произошла ошибка при обновлении данных");
      });
  }

  //Обработчик удаления фильма из избранного
  function handleDeleteMovie(movieId) {
    const token = localStorage.getItem("token");
    mainApi
      .deleteMovie(movieId, token)
      .then((res) => {
        const savedCards = savedMovies.filter(
          (card) => card.movieId !== movieId
        );
        setSavedMovies(savedCards);
        getSaved(movies, savedCards);
      })
      .catch(() => {
        setInformationPopupMessage("Произошла ошибка при обновлении данных");
      });
  }
  
  //Обработчик информационного попапа
  function handleSubmitInformationPopup() {
    setInformationPopupMessage("");
  }

  function handleMobileMenuOpen() {
    toggleMobileMenu(true);
  }

  function handleMobileMenuClose() {
    toggleMobileMenu(false);
  }

  function handleFilter() {
    setFilter(!filter);
  }

  function filterDuration(card) {
    return filter ? card.duration <= 40 : true;
  }
  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className="app">
        <div className="app__content">
          <Header
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            onOpenMobileMenu={handleMobileMenuOpen}
            loggedIn={loggedIn}
          />
          <Switch>
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              cards={savedMovies.filter(filterDuration)}
              component={Movies}
              saveMovie={handleSaveMovie}
              deleteMovie={handleDeleteMovie}
              viewsCount={viewsCount}
              handleMore={handleMore}
              handleFilter={handleFilter}
              filter={filter}
            />
            <ProtectedRoute
              path="/movies"
              viewsCount={viewsCount}
              loggedIn={loggedIn}
              cards={movies.filter(filterDuration)}
              handleMore={handleMore}
              component={Movies}
              saveMovie={handleSaveMovie}
              deleteMovie={handleDeleteMovie}
              handleFilter={handleFilter}
              filter={filter}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              handleUpdate={handleUpdate}
              component={Profile}
            />
            <Route path="/error">
              <Error message={error.message} status={error.status} />
            </Route>
            <Route path="/signin">
              <Auth
                handleSignIn={handleSignIn}
                handleSignUp={handleSignUp}
                isLogin={true}
              />
            </Route>
            <Route path="/signup">
              <Auth handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
            </Route>
            <Route exact path="/">
              <Main />
            </Route>
          </Switch>
          <Footer />
          {isLoading && <Preloader />}
          <InformationPopup
            message={informationPopupOpenMessage}
            onSubmit={handleSubmitInformationPopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
