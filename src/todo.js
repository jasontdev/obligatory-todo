import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import firebase from "firebase/app";
import "firebase/database";
import {Redirect, Route} from "react-router-dom";
import {faPlus, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Todo(props) {
    const auth = useAuth();

    return (
        <Route>
            {auth.user ?
                <div>
                    <h1>Todo</h1>
                    <TodoList/>
                    <AddTodo/>
                </div>
                :
                <Redirect to="/login"/>
            }
        </Route>
    );
}

function TodoList(props) {
    const [todoItems, setTodoItems] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        let todoItemsDBRef =
            firebase.database().ref('/users/' + auth.user.uid + '/todoItems');

        const onChildAdded = (data) => {
            setTodoItems(prevState => [...prevState, data]
                .sort((a, b) => a.val().position - b.val().position))
        }
        todoItemsDBRef.on('child_added', onChildAdded);

        const onChildUpdated = (data) => {
            // TODO: this code breaks the app
            setTodoItems(prevState => prevState.map((item) => item.key !== data.key ? item : data));
        }

        todoItemsDBRef.on('child_changed', onChildUpdated);

        const onChildRemoved = (data) => {
            // TODO: we need to adjust the orders of the objects now
            setTodoItems(prevState =>
                prevState.filter((item) => item.key !== data.key));
        }
        todoItemsDBRef.on('child_removed', onChildRemoved);

        return (() => {
            todoItemsDBRef.off('child_added', onChildAdded);
            todoItemsDBRef.off('child_changed', onChildUpdated);
            todoItemsDBRef.off('child_removed', onChildRemoved);
        });
    }, [auth.user.uid]);

    return (
        <div>
            <ul className="todo-list">
                {todoItems.map((item) => <TodoItem key={item.key} item={item}
                                                   className={item.val().complete ?
                                                   "todo-item todo-item-complete" : "todo-item"}/>)}
            </ul>
        </div>
    );
}

function TodoItem(props) {
    const auth = useAuth();

    function handleCompleteButtonClick() {
        const todoItemDBRef = firebase.database()
            .ref('/users/' + auth.user.uid + '/todoItems/' + props.item.key);

        const updatedItem = props.item.val();
        updatedItem.complete = !props.item.val().complete;

        todoItemDBRef.update(updatedItem);
    }

    return (
        <li>
            <div className={props.className}>
                <button className="form-button" onClick={() => handleCompleteButtonClick()}>
                    <FontAwesomeIcon icon={faCheck}/>
                </button>
                <div className="todo-item-title">{props.item.val().title}</div>
            </div>
        </li>
    );
}

function AddTodo(props) {

    const [newTodoItemDescription, setNewTodoItemDescription] = useState('');
    const auth = useAuth();

    function submitNewTodo(value) {
        if (newTodoItemDescription !== '') {
            const todoItemsRef = firebase.database()
                .ref('/users/' + auth.user.uid + '/todoItems');

            let numTodoItems = 0;
            todoItemsRef.once('value', function (data) {
                numTodoItems = data.numChildren()
            });

            const newTodoItemRef = todoItemsRef.push();
            newTodoItemRef.set({
                title: newTodoItemDescription,
                order: numTodoItems + 1,
                complete: false
            }).then(() => setNewTodoItemDescription(''));
        }
    }

    return (
        <div className="form-box">
            <div className="form-box-row">
                <input type="text" placeholder="New to-do item" value={newTodoItemDescription}
                       onChange={(e) => setNewTodoItemDescription(e.target.value)}/>
            </div>
            <button className="form-button"
                    onClick={(e) => submitNewTodo()}><FontAwesomeIcon icon={faPlus}/> ADD
            </button>
            <div className="form-box-row">
            </div>
        </div>
    );
}

export {Todo};