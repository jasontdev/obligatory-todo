import {useState} from "react";
import 'firebase/auth';
import firebase from "firebase/app";
import {Route, Redirect} from "react-router-dom";

function Register(props) {
  return (
    <div>
      <h1>Register for Obligatory Todo</h1>
      <RegisterBox/>
    </div>
  );
}

function RegisterBox(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userIsRegistered, setUserIsRegistered] = useState(false);

  function handleClick() {
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then(() => setUserIsRegistered(true))
      .catch((error) => {
        setUsername('');
        setPassword('');
      })
  }

  return (
    <Route exact path="/register">
      {userIsRegistered ? <Redirect to="/login"/> :
        <div className="form-box">
          <div className="form-box-row">
            <input type="email" placeholder="Email"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="form-box-row">
            <input type="password" placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="form-box-row">
            <button onClick={() => handleClick()}>REGISTER</button>
          </div>
        </div>}
    </Route>
  );
}

export {Register};
