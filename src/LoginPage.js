import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {Link} from "react-router-dom";

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginClick() {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        setPassword('');
        setUsername('');
      })
      .catch(() => console.log('Error logging in to firebase'));
  }

  return (
    <div className="flex-column">
      <h2>Login</h2>
      <input id="username" className="text-input flex-column-item" type="email" placeholder="Username" value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input id="password" className="text-input flex-column-item" type="password" placeholder="Password" value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button className="button" onClick={handleLoginClick}>LOGIN</button>
      <p>Not registered? Register <Link to="/register">here</Link>.</p>
    </div>
  );
}

export default LoginPage;