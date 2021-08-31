import React, {useEffect, useState} from 'react';
import firebase from "firebase/app";
import {Redirect} from "react-router-dom";

function RegisterPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [routeToTodos, setRouteToTodos] = useState(false);

  // TODO handle success/fail of registration. Show error or redirect to login
  const onButtonClick = function registerUserWithFirebase() {
    firebase.auth().createUserWithEmailAndPassword(username, password);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        setRouteToTodos(true);
      }
    })
  })
  return (
    routeToTodos ? <Redirect to="/login" /> :
    <div className="flex-column">
      <h2>Register</h2>
      <input id="username" value={username} className="text-input flex-column-item"
             type="email" placeholder="Email"
             onChange={(event) => setUsername(event.target.value)}/>
      <input id="password" value={password} className="text-input flex-column-item"
             type="password" placeholder="Password"
             onChange={(event) => setPassword(event.target.value)}/>
      <button className="button" onClick={onButtonClick}>REGISTER</button>
    </div>
  );
}

export default RegisterPage;