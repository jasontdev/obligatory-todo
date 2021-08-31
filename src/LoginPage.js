import React, {useEffect, useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {Link, Redirect} from "react-router-dom";
import {useAuth} from "./AuthProvider";

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  function handleLoginClick() {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        setPassword('');
        setUsername('');
      })
      .catch(() => console.log('Error logging in to firebase'));
  }

  useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setLoginSuccess(true);
        }
      });
    }
  )

  return (
    loginSuccess ?
      <Redirect to="/todos"/> :
      <div className="flex-column">
        <h2>Login</h2>
        <input id="username" className="text-input flex-column-item" type="email" placeholder="Username"
               value={username}
               onChange={e => setUsername(e.target.value)}/>
        <input id="password" className="text-input flex-column-item" type="password" placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}/>
        <button className="button" onClick={handleLoginClick}>LOGIN</button>
        <p>Not registered? Register <Link to="/register">here</Link>.</p>
      </div>
  );
}

export default LoginPage;