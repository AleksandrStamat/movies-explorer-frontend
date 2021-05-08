import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Error from "../Error/Error";
import InformationPopup from "../InformationPopup/InformationPopup";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { cards } from "../../utils/card";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
  const [informationPopupOpenMessage, setInformationPopupMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  function getUser(token) {
    mainApi
    .getUserData(token)
    .then((userData) => {
      setCurrentUser(userData);
      setLoggedIn(true);
    })
    .catch(({ status, message }) => {
      setError({ status, message });
      history.push("/error");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      getUser(token);
    }
  }

  function handleSignUp(data) {
    setIsLoading(true);
    mainApi
      .register(data)
      .then(() => {
        setInformationPopupMessage("Вы успешно зарегистрировались");
        history.push("/signin");
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        history.push("/error");
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
        history.push("/movies");
      })
      .catch(({ status, message }) => {
        setError({ status, message });
        history.push("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdate(user) {
    const token = localStorage.getItem('token');
    mainApi.editUser(user, token)
    .then((res) => {
      setCurrentUser(res);
      setInformationPopupMessage("Вы успешно изменили данные");
    })
    .catch((err) => console.log(err))
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/");
  }

  const handleSubmitInformationPopup = () => {
    setInformationPopupMessage("");
  };
  // const handleSignIn = () => {
  //   setLoggedIn(true);
  // };

  // const handleSignOut = () => {
  //   setLoggedIn(false);
  // };

  function handleMobileMenuOpen() {
    toggleMobileMenu(true);
  }

  function handleMobileMenuClose() {
    toggleMobileMenu(false);
  }

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
            <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} cards={cards.filter((item) => item.saved)} component={Movies} />
            <ProtectedRoute path="/movies" loggedIn={loggedIn} cards={cards} component={Movies} />
            <ProtectedRoute path="/profile" loggedIn={loggedIn} onSignOut={handleSignOut} handleUpdate={handleUpdate} component={Profile} />
            <Route path="/error">
              <Error message={error.message} status={error.status} />
            </Route>
            <Route path="/signin">
              <Login handleSignIn={handleSignIn} handleSignUp={handleSignUp} isLogin={true} />
            </Route>
            <Route path="/signup">
              <Login handleSignIn={handleSignIn} handleSignUp={handleSignUp} />
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
