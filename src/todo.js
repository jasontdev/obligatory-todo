import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import firebase from "firebase/app";
import "firebase/database";
import {TodoItem} from "./todoItem";
import {AddTodo} from "./addtodo";

function Todo(props) {
  return (
    <div>
      <h1>Todo</h1>
      <TodoItems/>
      <AddTodo/>
    </div>
  );
}

export function TodoItems(props) {
  const [todoItems, setTodoItems] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const renderItem = (dbItem) => {
      const newItem = {
        key: dbItem.key,
        val: function () {
          return (dbItem.val());
        }
      }

      setTodoItems(prevState => {
        const matchingIndex = prevState.findIndex((prevItem) => prevItem.key === newItem.key);

        if (matchingIndex > -1) {
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

export {Todo};