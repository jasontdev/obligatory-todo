import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";

function Login(props) {
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
    <div>
      <h3>Login</h3>
      <input id="username" type="email" placeholder="Username" value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input id="password" type="password" placeholder="Password" value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
}

export default Login;