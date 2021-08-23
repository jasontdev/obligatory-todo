import {useEffect, useState} from "react";
import firebase from "firebase";
import Todo from "./Todo";
import NewTodo from "./NewTodo";
import {useAuth} from "./AuthProvider";

function TodoList(props) {
  const [items, setItems] = useState([]);
  const auth = useAuth();

  function renderItem(item) {
    console.log('item: ' + item.val())
    setItems(prevState => [...prevState, item]);
  }

  useEffect(() => {
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items');

    const onUserItemsChildAdded = (item) => {
      const itemDBRef = firebase.database().ref('/items/' + item.val());
      itemDBRef.on('value', renderItem);
    }
    userItemsDBRef.on('child_added', onUserItemsChildAdded);

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