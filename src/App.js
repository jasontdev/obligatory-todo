import './App.css';
import {useState} from "react";

function App() {
  const [current, setCurrent] = useState('home');
  return (
    <div className="app">
      <Navbar router={setCurrent}/>
      <Router current={current}/>
    </div>
  );
}

function Navbar(props) {
  return (
    <div className="navbar">
      <div>
        Obligatory Todo
      </div>
      <div>
        <button className="navbar-button"
                onClick={() => {
                  props.router('login')
                }}>
          LOGIN
        </button>
      </div>
    </div>
  );
}

function Router(props) {
  let component = {};

  switch (props.current) {
    case 'home':
      component = <Home/>;
      break;
    case 'login':
      component = <Login/>;
      break;
    default:
      component = <Error/>
  }

  return (
    <div className="main-content">
      {component}
    </div>
  );
}

function Home(props) {
  return (
    <div>
      <h1>Welcome to Obligatory Todo</h1>
      <p>What web developer portfolio could be complete without a to-do application?</p>
    </div>
  );
}

function Login(props) {
  return (
    <div>
      <h1>Login to Obligatory Todo</h1>
      <LoginBox/>
    </div>);
}

function LoginBox(props) {
  function handleLogin() {
    console.log("Login event received");
  }

  return (
    <div className="login-box">
      <div className="login-box-row">
        <input type="text" placeholder="Username"/>
      </div>
      <div className="login-box-row">
        <input type="password" placeholder="Password"/>
      </div>

      <div className="login-box-row">
        <button className="login-button" onClick={() => handleLogin()}>LOGIN</button>
      </div>
    </div>
  );
}


function Error(props) {
  return (<div><h1>Uh oh</h1><h3>Something went wrong...</h3></div>);
};

export default App;
