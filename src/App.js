import './styles.css';
import TodoList from "./TodoList";
import AuthProvider from "./AuthProvider";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";

import React from 'react';
import Landing from "./Landing";
import RegisterPage from "./RegisterPage";

function App() {
  document.title = 'Obligatory Todo';

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/todos">
                <TodoList />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
