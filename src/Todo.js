import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

function Todo(props) {
  function handleCompleteClick() {

  }
  return (
    <div className="todo">
      <button onClick={handleCompleteClick} className="todo-item-complete-button">
        <FontAwesomeIcon icon={faCheck}
                         className={props.item.complete ? "todo-item-complete-icon-complete" : "todo-item-complete-icon"}></FontAwesomeIcon>
      </button>
      <span>{props.item.val.title}</span>
    </div>
  );
}

export default Todo;