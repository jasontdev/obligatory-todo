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
      <h2>Login</h2>
      <input id="username" className="text-input" type="email" placeholder="Username" value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input id="password" className="text-input" type="password" placeholder="Password" value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button className="button" onClick={handleLoginClick}>LOGIN</button>
    </div>
  );
}

export default Login;