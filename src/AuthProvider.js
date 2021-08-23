import firebase from "firebase/app";
import "firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setUser(user));
  },[]);

  const value = {user};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;