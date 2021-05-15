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
import {
  urlMovies,
  countVisibleCardsDesktop,
  countVisibleCardsTablet,
  countVisibleCardsMobile,
  addCardsDesktop,
  addCardsTablet,
  addCardsMobile,
  durationMovies,
} from "../../utils/constants";
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
    window.screen.width > 768
      ? countVisibleCardsDesktop
      : window.screen.width > 400
      ? countVisibleCardsTablet
      : countVisibleCardsMobile
  );
  const [filter, setFilter] = useState(false);

  function visibleError(err) {
    const message = err?.message;
    const bodyText = err?.validation?.body?.message;
    const error = bodyText
      ? bodyText
      : message
      ? message
      : "Произошла ошибка при обновлении данных";
    setInformationPopupMessage(error);
  }

  function tokenCheck(token) {
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
    const localMovies = localStorage.getItem("movies");
    const arrMovies = localMovies ? JSON.parse(localMovies) : [];
    const getMovies = arrMovies.length ? arrMovies : moviesApi.getMovies();
    Promise.all([getMovies, mainApi.getSavedMovies(token)])
      .then(([moviesCard, savedMoviesCard]) => {
        setSavedMovies(savedMoviesCard);
        getSaved(moviesCard, savedMoviesCard);
      })
      .catch(visibleError)
      .finally(() => setIsLoading(false));
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
      .catch(visibleError)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignIn({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem("token", token);
        getUser(token);
        setInformationPopupMessage("Вы успешно авторизировались");
        history.push("/movies");
      })
      .catch(visibleError)
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
      .catch(visibleError)
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
    const width = window.screen.width;
    const numberCount =
      width >= 1280
        ? addCardsDesktop
        : width > 480
        ? addCardsTablet
        : addCardsMobile;
    setViewsCount(viewsCount + numberCount);
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
      .catch(visibleError);
  }

  function filterMovies(cards, keyword) {
    return cards.filter(({ nameRU, nameEN }) => {
      if (!keyword) {
        return true;
      }
      if (typeof nameRU !== "string" || typeof nameEN !== "string") {
        return false;
      }
      const ru = nameRU.toLowerCase();
      const en = nameEN.toLowerCase();
      const word = keyword.toLowerCase();
      return ru.indexOf(word) !== -1 || en.indexOf(word) !== -1;
    });
  }

  function onSearch(keyword) {
    moviesApi.getMovies().then((cards) => {
      const searchCards = filterMovies(cards, keyword);
      getSaved(searchCards, savedMovies);
      localStorage.setItem("movies", JSON.stringify(searchCards));
    });
  }
  function onSearchSaved(keyword) {
    const token = localStorage.getItem("token");
    mainApi.getSavedMovies(token).then((cards) => {
      const searchCards = filterMovies(cards, keyword);
      setSavedMovies(searchCards);
    });
  }
  //Обработчик удаления фильма из избранного
  function handleDeleteMovie(movieId) {
    console.log(movieId);
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
      .catch(visibleError);
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
    return filter ? card.duration <= durationMovies : true;
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenCheck(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={{ ...currentUser }}>
      <div className="app">
        <div className="app__content">
          {isLoading ? (
            <Preloader />
          ) : (
            <>
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
                  onSearch={onSearchSaved}
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
                  onSearch={onSearch}
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
                  <Auth
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                  />
                </Route>
                <Route path="/">
                  <Main />
                </Route>
              </Switch>
              <Footer />
            </>
          )}
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
