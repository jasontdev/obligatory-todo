import React, {useState} from 'react';
import firebase from "firebase/app";
import {useAuth} from "./AuthProvider";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NewTodo(props) {
  const auth = useAuth();
  const [newTitle, setNewTitle] = useState('');

  function handleClick() {
    const newItem = {title: newTitle, user: auth.user.uid, complete: false};
    const newItemDBRef = firebase.database().ref('/items/').push();
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items/');

    // TODO we need to handle condition no item list exists
    newItemDBRef.set(newItem).then(() => {
        // fetch the last item/highest index in the list
        userItemsDBRef.orderByChild('/index').limitToLast(1).once('value')
          .then((data) => {
              // key added to the end of the list should have an index higher than current
              // TODO explore database transaction support to mitigate concurrency issue
              const newItemIndex = maxIndex(data);
              if (newItemIndex) {
                addToItemKeyList(userItemsDBRef, newItemIndex + 1, newItemDBRef.key);
              } else {
                addToItemKeyList(userItemsDBRef, 0, newItemDBRef.key)
              }
            }
          );
      }
    );

    // find highest index value in a snapshot of items
    const maxIndex = (data) => {
      let max;
      data.forEach((item) => max = item.val().index);
      return max;
    }

    const addToItemKeyList = (itemListDBRef, index, key) => {
      itemListDBRef.push().set({index: index, itemId: key});
    }

    setNewTitle('');
  }

  function onInputChange(e) {
    setNewTitle(e.target.value);
  }

  return (
    <div className="todo-item">
      <div className="todo-item-row centered">
        <div className="todo-item-col">
          <input className="text-input" type="text"
                 value={newTitle}
                 onChange={onInputChange}
                 placeholder="New todo..."/>
          <button className="button" onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTodo;