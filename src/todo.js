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
      setTodoItems(prevState => [...prevState, data]
        .sort((a, b) => a.val().position - b.val().position))
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
        { todoItems.map((data) => <TodoItem key={data.key} item={data} />)}
      </ul>
    </div>
  );
}

function TodoItem(props) {
  return (
      <li className="todo-item">{props.item.val().title}</li>
  );
}

function AddTodo(props) {

  const [newTodoItemDescription, setNewTodoItemDescription] = useState('');
  const auth = useAuth();
  function submitNewTodo(value) {
    if(newTodoItemDescription !== '') {
      const todoItemsRef = firebase.database()
        .ref('/users/' + auth.user.uid + '/todoItems');

     let numTodoItems = 0;
     todoItemsRef.once('value',function(data) {numTodoItems = data.numChildren()});

     const newTodoItemRef = todoItemsRef.push();
     newTodoItemRef.set({
       title: newTodoItemDescription,
       order: numTodoItems + 1,
       complete: false
     }).then(() => setNewTodoItemDescription(''));
    }
  }

  return (
    <div className="form-box">
      <div className="form-box-row">
        <input type="text" placeholder="New to-do item" value={newTodoItemDescription}
        onChange={(e) => setNewTodoItemDescription(e.target.value)}/>
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