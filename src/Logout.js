import React, {useState} from 'react';
import {useAuth} from "./AuthProvider";
import firebase from "firebase/app";
import {Redirect} from "react-router-dom";

function Logout(props) {
  const [route, setRoute] = useState('');
  const auth = useAuth();

  const onClickYes = function SignOutUser() {
    firebase.auth().signOut().then(r => setRoute('landing'));
  }

  const onClickNo = function routeToTodos() {
    setRoute('todos');
  }

  switch (route) {
    case 'todos':
      return <Redirect to="/todos"/>
    case 'landing':
      return <Redirect to="/"/>
    default:
      return (
        <div>
          <h2>Logout</h2>
          <div className="flex-column">
            <p>Are you sure want to log out of Obligatory Todo?</p>
            <div className="flex-row">
              <button className="button ml-mr-5" onClick={onClickYes}>YES</button>
              <button className="button ml-mr-5" onClick={onClickNo}>NO</button>
            </div>
          </div>
        </div>
      );
  }
}

export default Logout;