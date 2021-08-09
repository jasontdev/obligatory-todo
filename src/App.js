import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import {Login} from './login';
import {Register} from './register';
import {Todo} from './todo';
import {ProvideAuth} from "./auth";
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
  return (
    <div className="navbar">
      <div>
        Obligatory Todo
      </div>
      <div>
        <Link to="/login">LOGIN</Link>
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

function Error(props) {
  return (<div><h1>Uh oh</h1><h3>Something went wrong...</h3></div>);
}

export default App;
