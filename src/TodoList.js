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
  return prevState.filter((prevItem) => prevItem.key !== item.key);
}

function TodoList(props) {
  const [items, setItems] = useState([]);
  const auth = useAuth();

  // TODO testing these hooks will require mocking firebase.database()
  useEffect(() => {
    const onItemsChildAdded = (data) => {
      setItems(prevState => updateOrAddItem(prevState, data))
    }
    const itemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items/');
    itemsDBRef.on('child_added', onItemsChildAdded);

    const onItemsChildChanged = (data) => {
      setItems(prevState => updateOrAddItem(prevState, data));
    }
    itemsDBRef.on('child_changed', onItemsChildChanged);

    const onItemsChildRemoved = (data) => {
      setItems(prevState => removeItem(prevState, data));
    }
    itemsDBRef.on('child_removed', onItemsChildRemoved)
  }, [auth.user.uid]);

  return (
    <div className="todo-list">
      <h2>Todo list</h2>
      <ul className="todo-list-ul">
        {items.map((item) => <li><Todo item={item} key={item.key}/></li>)}
        <li><NewTodo/></li>
      </ul>
    </div>
  );
}

export default TodoList;