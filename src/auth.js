import {createContext, useContext, useEffect, useState} from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {setUser(response.user); return response.user; });
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signIn
  };
}