import {useEffect, useState} from "react";
import firebase from "firebase";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import {useAuth} from "./AuthProvider";

// TODO unit test for weird cases
export function updateOrAddItem(prevState, item) {
  const prevIndex = prevState.findIndex((prevItem) => prevItem.key === item.key);
  if (prevIndex > -1) {
    const newState = [...prevState];
    newState.splice(prevIndex, 1, item);
    return newState;
  } else {
    return [...prevState, item];
  }
}

// TODO unit test for weird cases
export function removeItem(prevState, item) {
  return prevState.filter((prevItem) => prevItem.key !== item);
}

function TodoList(props) {
  const [items, setItems] = useState([]);
  const auth = useAuth();

  // TODO testing these hooks will require mocking firebase.database()
  useEffect(() => {
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items');
    const onUserItemsChildAdded = (data, prevKey) => {
      const itemDBRef = firebase.database().ref('/items/' + data.val().itemId);
      itemDBRef.on('value',
        (item) => {
          // item will have a lot of Firebase related cruft so let's create a new item
          // with just the info the app needs
          const newItem = { key: item.key, val: item.val()};
          setItems(prevState => updateOrAddItem(prevState, newItem));
        });
    }
    userItemsDBRef.on('child_added', onUserItemsChildAdded);

    userItemsDBRef.on('child_removed', (item) => {
      const itemsDBRef = firebase.database().ref('/items/' + item.val().itemId);
      itemsDBRef.off('value');
      setItems(prevState => removeItem(prevState, item.val().itemId));
    })

    return (() => {
      userItemsDBRef.off('child_added', onUserItemsChildAdded);
    });
  }, [auth.user.uid]);
  return (
    <div className="todo-list">
      <h2>Todo list</h2>
      <ul className="todo-list-ul">
        {items.map((item) => <li><Todo item={item} /></li>)}
        <li><NewTodo/></li>
      </ul>
    </div>
  );
}

export default TodoList;