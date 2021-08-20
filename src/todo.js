import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import firebase from "firebase/app";
import "firebase/database";
import {Redirect, Route} from "react-router-dom";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TodoItem} from "./todoItem";

function Todo(props) {
  const auth = useAuth();

  return (
    <Route>
      {auth.user ?
        <div>
          <h1>Todo</h1>
          <TodoList />
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
    const renderItem = (newItem) => {
      setTodoItems(prevState => {
        const matchingIndex = prevState.findIndex((prevItem) => prevItem.key === newItem.key);

        if(matchingIndex > -1) {
          const newState = [...prevState];
          newState.splice(matchingIndex, 1, newItem);
          return newState;
        } else {
          return [...prevState, newItem]
        }
      })
    }

    const onUserItemsChildRemoved = (removedItem) => {
      const itemDBRef = firebase.database().ref('/items' + removedItem.val())
      itemDBRef.off('value');
      setTodoItems(prevState => prevState.filter((item) => item.key !== removedItem.val()));
    }

    const onUserItemsChildAdded = (newItem) => {
      const itemDBRef = firebase.database().ref('/items/' + newItem.val());
      itemDBRef.on('value', renderItem);
    }

    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items/');
    userItemsDBRef.on('child_added', onUserItemsChildAdded);
    userItemsDBRef.on('child_removed', onUserItemsChildRemoved);

    return (() => {
      userItemsDBRef.off('child_added', onUserItemsChildAdded);
      userItemsDBRef.off('child_removed', onUserItemsChildRemoved);
    });
  }, [auth.user.uid]);

  return (
    <div>
      <ul className="todo-list">
        {todoItems.map((item) => <TodoItem key={item.key} item={item}
                                           className={item.val().complete ?
                                             "todo-item todo-item-complete" : "todo-item"}/>)}
      </ul>
    </div>
  );
}

function AddTodo(props) {
  const [newItemTitle, setNewItemTitle] = useState('');

  const auth = useAuth();

  function submitNewTodo(value) {
    // add the item
    const itemsDBRef = firebase.database().ref('/items/').push();
    itemsDBRef.set({
      title: newItemTitle,
      user: auth.user.uid,
      complete: false
    }).then(() => {
      const userItemsDBRef = firebase.database()
        .ref('/users/' + auth.user.uid + '/items/');
      userItemsDBRef.once('value')
        .then(items => items.exists() ? userItemsDBRef.set([...items.val(), itemsDBRef.key])
          : userItemsDBRef.set([itemsDBRef.key]));
    });
  }

  return (
    <div className="form-box">
      <div className="form-box-row">
        <input type="text" placeholder="New to-do item" value={newItemTitle}
               onChange={(e) => setNewItemTitle(e.target.value)}/>
      </div>
      <button className="form-button"
              onClick={(e) => submitNewTodo()}><FontAwesomeIcon icon={faPlus}/> ADD
      </button>
      <div className="form-box-row">
      </div>
    </div>
  );
}

export {Todo};