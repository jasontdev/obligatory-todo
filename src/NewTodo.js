import React, {useState} from 'react';
import firebase from "firebase/app";
import {useAuth} from "./AuthProvider";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NewTodo(props) {
  const auth = useAuth();
  const [newTitle, setNewTitle] = useState('');

  function handleClick() {
    const userItemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items/');

    // fetch the last item/highest index in the list
    userItemsDBRef.orderByChild('/index').limitToLast(1).once('value')
      .then((data) => {
        const newUserItemDBRef = userItemsDBRef.push();
          const newItem = {title: newTitle, user: auth.user.uid,
            complete: false, itemListId: newUserItemDBRef.key };
          const newItemDBRef = firebase.database().ref('/items/').push();
          newItemDBRef.set(newItem);
          // key added to the end of the list should have an index higher than current
          // TODO explore database transaction support to mitigate concurrency issue
          const newItemIndex = maxIndex(data);
          if (newItemIndex) {
            addToItemKeyList(newUserItemDBRef, newItemIndex + 1, newItemDBRef.key);
          } else {
            addToItemKeyList(newUserItemDBRef, 0, newItemDBRef.key)
          }
        }
      );

    // find highest index value in a snapshot of items
    const maxIndex = (data) => {
      let max;
      data.forEach((item) => max = item.val().index);
      return max;
    }

    const addToItemKeyList = (itemListDBRef, index, key) => {
      itemListDBRef.set({index: index, itemId: key});
    }

    setNewTitle('');
  }

  function onInputChange(e) {
    setNewTitle(e.target.value);
  }

  return (
    <div className="todo-item">
      <div className="todo-item-row centered">
        <div className="flex-column">
          <input className="text-input new-todo-input flex-column-item" type="text"
                 value={newTitle}
                 onChange={onInputChange}
                 placeholder="New todo..."/>
          <div>
            <button className="button ml-mr-5" onClick={handleClick}>
              ADD
            </button>
            <button className="button ml-mr-5" onClick={() => setNewTitle('')}>
              CANCEL
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewTodo;