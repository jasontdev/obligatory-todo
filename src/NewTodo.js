import React, {useState} from 'react';
import firebase from "firebase/app";
import {useAuth} from "./AuthProvider";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NewTodo(props) {
  const auth = useAuth();
  const [newTitle, setNewTitle] = useState('');

  function handleClick() {
    const itemsDBRef = firebase.database().ref('/users/' + auth.user.uid + '/items/').push();
    // TODO find new index first
    let maxIndex = 0;
    itemsDBRef.limitToLast(1).once('value', (data) => {
      if(data.exists()) {
        data.forEach((item) => maxIndex = item.val().index);
      }
    });
    itemsDBRef.set( { title: newTitle, complete: false, index: maxIndex + 1});
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