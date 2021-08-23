import './App.css';
import TodoList from "./TodoList";
import AuthProvider from "./AuthProvider";
import Login from "./Login";

function App() {
    return (
    <div className="App">
      <AuthProvider>
        <Login />
        <TodoList />
      </AuthProvider>
    </div>
  );
}

export default App;
