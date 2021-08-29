import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

function TodoOptions(props) {
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
      <button className="button button-secondary">
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}

export default TodoOptions;