import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";

function Todo(props) {
  const [pulldown, setPulldown] = useState(false);

  function handleCompleteClick() {
    const itemDBRef = firebase.database().ref('/items/' + props.item.key);
    itemDBRef.child('/complete').set(!props.item.val.complete);
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
                             className={props.item.val.complete ?
                               "todo-item-complete-icon-complete" : "todo-item-complete-icon"}/>

          </button>
          <div className="todo-item-title">{props.item.val.title}</div>
        </div>
        <div className="todo-item-col">
          <button onClick={handleChevronClick}><FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
      </div>
      {pulldown ? <div className="todo-item-row">Here is the second row.</div> : <div />}
    </div>
  );
}

export default Todo;