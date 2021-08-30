import React, {useState} from 'react';
import firebase from "firebase/app";

function RegisterPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

const onButtonClick = function registerUserWithFirebase() {
  firebase.auth().createUserWithEmailAndPassword(username, password)
    .then(r => setRegistered(true));
}

  return (
    <div className="flex-column">
      <h2>Register</h2>
      <input id="username" value={username} className="text-input flex-column-item"
      type="email" placeholder="Email" />
      <input id="password" value={password} className="text-input flex-column-item"
      type="password" placeholder="Password" />
      <button className="button">REGISTER</button>
    </div>
  );
}

export default RegisterPage;