import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import firebase from "firebase/app";
import "firebase/database";
import {Redirect, Route} from "react-router-dom";
import {faPlus, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items');
    const onUserItemsChildAdded = (data) => {
      // create listener to connect item with todoItems[]
      const itemDBRef = firebase.database().ref('/items/' + data.val());
      itemDBRef.on('value', onItemValue);

      // add item to todoItems
      itemDBRef.once('value')
        .then((item) => setTodoItems(prevState => [...prevState, item]));
    }
    userItemsDBRef.on('child_added', onUserItemsChildAdded);

    const onItemValue = (data) => {
      setTodoItems(prevState => [...prevState].map((item) => item.key === data.key ? data : item));
    }

    return (() => {
      // TODO clean up 'value' event listeners
      userItemsDBRef.off('child_added', onUserItemsChildAdded);
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

function TodoItem(props) {
  const auth = useAuth();

  function handleCompleteButtonClick() {
    const itemDBRef = firebase.database().ref('/items/' + props.item.key);
    const newItem = {
      title: props.item.val().title,
      complete: !props.item.val().complete,
      user: props.item.val().user
    }
    itemDBRef.set(newItem);
  }

  return (
    <li>
      <div className={props.className}>
        <button className="form-button" onClick={() => handleCompleteButtonClick()}>
          <FontAwesomeIcon icon={faCheck}/>
        </button>
        <div className="todo-item-title">{props.item.val().title}</div>
      </div>
    </li>
  );
}

function AddTodo(props) {
  const [newItemTitle, setNewItemTitle] = useState('');

  const auth = useAuth();

  function submitNewTodo(value) {

    // add the item
    const itemsDBRef = firebase.database().ref('/items').push();
    itemsDBRef.set({
      title: newItemTitle,
      user: auth.user.uid,
      complete: false
    });

    // add item to users list
    const userDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items');
    userDBRef.once('value').then((items) => {
      items.exists() ?
        userDBRef.set([...items.val(), itemsDBRef.key])
        : userDBRef.set([itemsDBRef.key]);
      setNewItemTitle('')
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