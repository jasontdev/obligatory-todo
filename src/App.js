import './App.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <div class="App">
      <div className="container">
        <Header className="header"></Header>
        <LoginPage className="login-page"></LoginPage>
      </div>
    </div>
  );
}

function Header(props) {
  return (
    <div className="header">
      <h1>Obligatory Todo</h1>
    </div>
  );
}

function LoginPage(props) {
  return (
    <div class="login-page">
      <LoginBox></LoginBox>
    </div>
  );
}

function LoginBox(props) {
  return (
    <div className="login-box">
      <div className="login-box-row">
        <label for="username" className="login-box-label">
          <FontAwesomeIcon icon={ faUser } />
        </label>
        <input id="username" type="email" 
        className="text-input-box"
        placeholder="Username"></input>
      </div>
      <div className="login-box-row">
        <label for="password" className="login-box-label">
          <FontAwesomeIcon icon={faKey} />
        </label>
        <input id="password" type="password" 
        className="text-input-box" 
        placeholder="Password"></input>
      </div>
      <div className="login-box-button-row">
        <button className="login-button">Login</button>
      </div>
    </div>
  );
}

export default App;
