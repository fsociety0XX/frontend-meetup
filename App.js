import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";
import Register from "./Register";
import Home from "./HomePage";
import Discussion from "./Discussion";
import Calender from "./Calender";
import Resource from "./Resource";
import { auth } from "../Firebase";
import { StateContext } from "../contextAPI/StateProvider";
import AuthenticatedRoute from "../Route/AuthenticatedRoute";
import UnauthenticatedRoute from "../Route/UnauthenticatedRoute";
import { userId } from "../utils";

function App() {
  const [{ user }, dispatch] = useContext(StateContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user just logged in or was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // this will check if user is authenticated or not everytime and then allow access to specific pages
    user
      ? userId.includes(user.uid)
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false)
      : setIsAuthenticated(false);
  }, [user]);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <UnauthenticatedRoute
          appProps={{ isAuthenticated }}
          component={Register}
          path="/register"
        />

        <AuthenticatedRoute
          appProps={{ isAuthenticated }}
          component={Home}
          path="/home"
        />

        <AuthenticatedRoute
          appProps={{ isAuthenticated }}
          component={Calender}
          path="/calender"
        />

        <AuthenticatedRoute
          appProps={{ isAuthenticated }}
          component={Discussion}
          path="/discussions"
        />

        <AuthenticatedRoute
          appProps={{ isAuthenticated }}
          component={Resource}
          path="/resource"
        />

        <UnauthenticatedRoute
          appProps={{ isAuthenticated }}
          component={LandingPage}
          path="/"
        />
      </Switch>
    </Router>
  );
}

export default App;
