import {useAuth} from "./auth";
import firebase from "firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

function AddTodo(props) {
  const [newItemTitle, setNewItemTitle] = useState('');

  const auth = useAuth();

  function submitNewTodo(value) {
    // add the item
    const itemsDBRef = firebase.database().ref('/items/').push();
    itemsDBRef.set({
      title: newItemTitle,
      user: auth.user.uid,
      complete: false
    }).then(() => {
      const userItemsDBRef = firebase.database()
        .ref('/users/' + auth.user.uid + '/items/');
      userItemsDBRef.once('value')
        .then(items => items.exists() ? userItemsDBRef.set([...items.val(), itemsDBRef.key])
          : userItemsDBRef.set([itemsDBRef.key]))
        .then(() => setNewItemTitle(''));
    });
  }

  return (
    <div className="form-box">
      <div className="form-box-row">
        <input type="text" placeholder="New to-do item" value={newItemTitle}
               onChange={(e) => setNewItemTitle(e.target.value)}/>
      </div>
      <button className="form-button"
              onClick={(e) => submitNewTodo()}><FontAwesomeIcon icon={faPlus}/> ADD
      </button>
      <div className="form-box-row">
      </div>
    </div>
  );
}

export {AddTodo};