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
  const [todoItems, setTodoItems] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    let todoItemsDBRef =
      firebase.database().ref('/users/' + auth.user.uid + '/todoItems');

    const onChildAdded = (data) => {
      setTodoItems(prevState => [...prevState, data])
    }
    todoItemsDBRef.on('child_added', onChildAdded);

    const onChildRemoved = (data) => {
      setTodoItems( prevState =>
        prevState.filter((item) => item.key !== data.key));
    }
    todoItemsDBRef.on('child_removed', onChildRemoved);

    return (() => {
      todoItemsDBRef.off('child_added', onChildAdded);
      todoItemsDBRef.off('child_removed', onChildRemoved);
    });
  }, [auth.user.uid]);

  return (
    <div>
      <ul className="todo-list">
        { todoItems.map((data) => <TodoItem key={data.key} value={data.val()} />)}
      </ul>
    </div>
  );
}

function TodoItem(props) {
  return (
      <li className="todo-item" key={props.key}>{props.value}</li>
  );
}

function AddTodo(props) {

  const [newTodoItem, setNewTodoItem] = useState('');
  const auth = useAuth();
  function submitNewTodo(value) {
    if(newTodoItem !== '') {
      const newDBTodoItem = firebase.database().ref('/users/' + auth.user.uid + '/todoItems').push();
      newDBTodoItem.set(newTodoItem).then(() => setNewTodoItem(''));
    }
  }

  return (
    <div className="form-box">
      <div className="form-box-row">
        <input type="text" placeholder="New to-do item" value={newTodoItem}
        onChange={(e) => setNewTodoItem(e.target.value)}/>
      </div>
      <div className="form-box-row">
        <button className="form-button"
                onClick={(e) => submitNewTodo()}>ADD
        </button>
      </div>
    </div>
  );
}

export {Todo};