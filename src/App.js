import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect, useLocation
} from 'react-router-dom';
import {Login} from './login';
import {Register} from './register';
import {Todo} from './todo';
import {ProvideAuth, useAuth} from "./auth";
import React from "react";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="app">
          <Navbar/>
          <div className="main-content">
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/register">
                <Register/>
              </Route>
              <Route exact path="/todo">
                <Todo/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ProvideAuth>
  );
}

function Navbar(props) {

  const auth = useAuth();
  const location = useLocation();

  function navbarButton() {
    if(auth.user) {
      if(location.pathname === '/todo') {
        return <Link className="navbar-button" to="/">LOGOUT</Link>
      }
      return <Link className="navbar-button" to="/todo">TODOS</Link>
    } else {
      return <Link className="navbar-button" to="/login">LOGIN</Link>
    }
  }
  return (
    <div className="navbar">
      <div>
        Obligatory Todo
      </div>
      <div>
        {navbarButton()}
      </div>
    </div>
  );
}

function Home(props) {
  return (
    <div>
      <h1>Welcome to Obligatory Todo</h1>
      <p>What web developer portfolio could be complete without a to-do application?</p>
    </div>
  );
}

export default App;
