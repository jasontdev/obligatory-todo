import './App.css';
import TodoList from "./TodoList";
import AuthProvider from "./AuthProvider";
import Login from "./Login";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar/>
        <div className="container">
          <Login/>
        </div>
        <div className="container">
          <TodoList/>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
