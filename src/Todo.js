import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import TodoOptions from "./TodoOptions";
import {useAuth} from "./AuthProvider";

function Todo(props) {
  const [pulldown, setPulldown] = useState(false);
  const auth = useAuth();

  function handleCompleteClick() {
    const itemDBRef = firebase.database()
      .ref('/users/' + auth.user.uid + '/items/' + props.item.key);
    itemDBRef.child('/complete').set(!props.item.val().complete);
  }

  function handleChevronClick() {
    setPulldown(prevState => !prevState);
  }

  return (
    <div className="todo-item">
      <div className="todo-item-row">
        <div className="todo-item-col">
          <button onClick={handleCompleteClick} className="todo-item-complete-button">
            <FontAwesomeIcon icon={faCheck}
                             className={props.item.val().complete ?
                               "todo-item-complete-icon-complete" : "todo-item-complete-icon"}/>

          </button>
          <div className="todo-item-title">{props.item.val().title}</div>
        </div>
        <div className="todo-item-col">
          <button className="button button-secondary" onClick={handleChevronClick}><FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
      </div>
      {pulldown ? <div className="todo-item-row centered"><TodoOptions item={props.item}/></div> : <div />}
    </div>
  );
}

export default Todo;