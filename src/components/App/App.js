import React, { useState } from "react";
import { Route, Switch } from "react-router";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Error from "../Error/Error";
import { cards } from "../../utils/card";
import "./App.css";

function App() {
  const [isMobileMenuOpen, toggleMobileMenu] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
  };

  function handleMobileMenuOpen() {
    toggleMobileMenu(true);
  }

  function handleMobileMenuClose() {
    toggleMobileMenu(false);
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          onOpenMobileMenu={handleMobileMenuOpen}
          loggedIn={loggedIn}
        />
        <Switch>
          <Route path="/error">
            <Error />
          </Route>
          <Route path="/signin">
            <Login onSignIn={handleSignIn} />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies cards={cards} />
          </Route>
          <Route path="/saved-movies">
            <Movies cards={cards.filter((item) => item.saved)} />
          </Route>
          <Route path="/profile">
            <Profile onSignOut={handleSignOut} />
          </Route>
          <Switch>
            <Route path="/profile" />
            <Route path="/"></Route>
          </Switch>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
