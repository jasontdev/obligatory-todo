import {useEffect, useState} from "react";
import firebase from "firebase";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import {useAuth} from "./AuthProvider";

// TODO unit test
export function updateOrAddItem(prevState, item) {
    const prevIndex = prevState.findIndex((prevItem) => prevItem.key === item.key);
    if(prevIndex > -1) {
      const newState = [...prevState];
      newState.splice(prevIndex, 1, item);
      return newState;
    } else {
      return [...prevState, item];
    }
}

// TODO unit test
export function removeItem(prevState, item) {
  return prevState.filter((prevItem) => prevItem.key !== item.val());
}

function TodoList(props) {
  const [items, setItems] = useState([]);
  const auth = useAuth();

  // TODO testing these hooks will require mocking firebase.database()
  useEffect(() => {
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items');
    const onUserItemsChildAdded = (item) => {
      const itemDBRef = firebase.database().ref('/items/' + item.val());
      itemDBRef.on('value',
          item => setItems( prevState => updateOrAddItem(prevState, item)));
    }
    userItemsDBRef.on('child_added',onUserItemsChildAdded);

    const onUserItemsChildRemoved = (item) => {
      const itemDBRef = firebase.database().ref('/items' + item.val());
      itemDBRef.off('value', updateOrAddItem);
      setItems(prevState => removeItem(prevState, item));
    }
    userItemsDBRef.on('child_removed', onUserItemsChildRemoved);

    return (() => {
      userItemsDBRef.off('child_added', onUserItemsChildAdded);
      userItemsDBRef.off('child_removed', onUserItemsChildRemoved);
    });
  },[auth.user.uid]);
  return (
    <div>
      <ul>
        {items.map((item) => <li><Todo item={item} /></li>)}
        <li><NewTodo /></li>
      </ul>
    </div>
  );
}

export default TodoList;