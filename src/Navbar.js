import React from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "./AuthProvider";

function Navbar(props) {
  const auth = useAuth();

  // TODO implement sign-out
  // TODO auth.user.uid undefined when not logged in, causes error
  return (
    <div className="navbar">
      <div className="navbar-brand"><strong>Obligatory Todo</strong></div>
      <nav>
        {auth.user ?
          <div className="navbar-nav">
            <span className="navbar-nav-item">
              <Link to="/todos">TODOS</Link>
            </span>
            <span className="navbar-nav-item">
              <Link to="/logout">LOGOUT</Link>
            </span>
          </div>
          :
          <div className="navbar-nav">
            <span className="navbar-nav-item">
              <Link to="/login">LOGIN</Link>
            </span>
            <span className="navbar-nav-item">
              <Link to="/register">REGISTER</Link>
            </span>
          </div>
        }
      </nav>
    </div>
  );
};

export default Navbar;