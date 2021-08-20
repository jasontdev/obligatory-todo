import firebase from "firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faChevronDown, faChevronUp,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useAuth} from "./auth";

function TodoItem(props) {
  const [expand, setExpand] = useState(false);

  const auth = useAuth();

  const handleDelete = () => {
    // removing the entry from the user's item list will trigger removal of the item
    const userItemsItemRef = firebase.database().ref('/users/' + auth.user.uid + '/items/');
    userItemsItemRef.once('value').then((items) => {
      if(items.exists()) {
        const newItems = items.val().filter((item) => item !== props.item.key);
        userItemsItemRef.set(newItems);
      }
    });
  }

  function handleCompleteButtonClick() {
    const itemDBRef = firebase.database().ref('/items/' + props.item.key);
    const newItem = {
      title: props.item.val().title,
      complete: !props.item.val().complete,
      user: props.item.val().user
    }
    itemDBRef.set(newItem);
  }

  return (
    <li>
      <div className={props.className}>
        <div className="todo-item-row">
          <div className="todo-item-col">
            <button className="form-button" onClick={() => handleCompleteButtonClick()}>
              <FontAwesomeIcon icon={faCheck}
                               className={props.item.val().complete ?
                                 'todo-button-icon-complete' : 'todo-button-icon'}/>
            </button>
            <span className={props.item.val().complete ? 'todo-item-title todo-item-title-complete'
              : 'todo-item-title'}>{props.item.val().title}</span>
          </div>
          <div className="todo-item-col">
            <button className="todo-item-button" onClick={() => setExpand(prevState => !prevState)}>
              <div><FontAwesomeIcon icon={expand ? faChevronUp : faChevronDown}/></div>
            </button>
          </div>
        </div>
        <div>
          {expand ?
            <div className="todo-item-expand-row">
              <button className="todo-item-button">
                <FontAwesomeIcon icon={faArrowUp}/>
              </button>
              <button className="todo-item-button">
                <FontAwesomeIcon icon={faArrowDown}/>
              </button>
              <button className="todo-item-button">
                <FontAwesomeIcon icon={faPencilAlt}/>
              </button>
              <button className="todo-item-button" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div> : <span></span>}
        </div>
      </div>
    </li>
  );
}

export {TodoItem};