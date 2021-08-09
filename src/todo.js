import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import firebase from "firebase/app";
import "firebase/database";
import {Redirect, Route} from "react-router-dom";

function Todo(props) {
  const auth = useAuth();

  return (
    <Route>
      {auth.user ?
        <div>
          <h1>Todo</h1>
          <TodoList/>
          <AddTodo/>
        </div>
        :
        <Redirect to="/login"/>
      }
    </Route>
  );
}

function TodoList(props) {
  const [todoItems, setTodoItems] = useState(['']);
  const auth = useAuth();

  useEffect(() => {
    let todoItemsDBRef =
      firebase.database().ref('/users/' + auth.user.uid + '/todoItems');

    const onValueChange = (snapshot) => {
      const data = snapshot.val();
      setTodoItems(data);
    }

    todoItemsDBRef.on('value', onValueChange);

    return (() => {
      todoItemsDBRef.off('value', onValueChange);
    });
  }, [auth.user.uid]);

  const todoListItems = todoItems.map((item) => <li key={item}>{item}</li>);
  return (
    <div>
      <ul className="todo-list">
        {todoListItems}
      </ul>
    </div>
  );
}

function AddTodo(props) {

  return (
    <div className="form-box">
      <div className="form-box-row">
        <input type="text" placeholder="New to-do item"/>
      </div>
      <div className="form-box-row">
        <button className="form-button">ADD
        </button>
      </div>
    </div>
  );
}

export {Todo};