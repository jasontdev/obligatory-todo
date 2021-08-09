import {useState} from "react";
import {Route, Link, Redirect} from 'react-router-dom';
import {useAuth} from "./auth";

function Login(props) {
  return (
    <div>
      <h1>Login to Obligatory Todo</h1>
      <LoginBox/>
      <p>New to Obligatory Todo? Register <Link to="/register">here</Link>.</p>
    </div>);
}

function LoginBox(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  return (
      <Route exact path="/login">
        { auth.user ?
          <Redirect to='/todo' />
          :
          <div className="form-box">
            <div className="form-box-row">
              <input type="text" placeholder="Username" value={username}
                     onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-box-row">
              <input type="password" placeholder="Password" value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-box-row">
              <button className="form-button" onClick={() => auth.signIn(username, password)}>LOGIN</button>
            </div>
          </div>}
      </Route>
  );
}

export {Login};