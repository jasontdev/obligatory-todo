import React, {useState} from 'react';
import firebase from "firebase/app";

function RegisterPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onButtonClick = function registerUserWithFirebase() {
    firebase.auth().createUserWithEmailAndPassword(username, password);
  }

  return (
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