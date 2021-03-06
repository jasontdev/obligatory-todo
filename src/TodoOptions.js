import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import {useAuth} from "./AuthProvider";

function TodoOptions(props) {
  const auth = useAuth();

  function onClickTrash() {
    const userItemsDBRef = firebase.database()
      .ref('/users/' + auth.user.uid + '/items/' + props.item.key);
    userItemsDBRef.remove();
  }

  return (
    <div className="todo-item-options">
      <button className="button button-secondary">
        <FontAwesomeIcon icon={faArrowUp}/>
      </button>
      <button className="button button-secondary">
        <FontAwesomeIcon icon={faArrowDown}/>
      </button>
      <button className="button button-secondary">
        <FontAwesomeIcon icon={faPen}/>
      </button>
      <button className="button button-secondary"
      onClick={onClickTrash}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}

export default TodoOptions;