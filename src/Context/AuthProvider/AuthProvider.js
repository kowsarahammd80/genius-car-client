import React, { createContext, useEffect, useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../Firebase/Firebase.config';



export let AuthContext = createContext();

let auth = getAuth(app);

const AuthProvider = ({children}) => {
    let [user, setUser] = useState();
    let [loading, setLoading] = useState(true);

    let providerLogin = (provider) => {
      return signInWithPopup(auth, provider)
    }

    let createForUser = (email, password) => {
     return createUserWithEmailAndPassword(auth, email, password);
    }

    let sigIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    }

    let logOut = () => {
      localStorage.removeItem('genius-token');
      return signOut(auth); 
    }

    let updateProfiel = (profaile) => {
      return updateProfile(auth.currentUser, profaile)
    }

    useEffect(() => {
     let unsubsribe =  onAuthStateChanged(auth,currentUser => {
          console.log(currentUser)
          setUser(currentUser);
          setLoading(false);
       });

       return () => {
         return unsubsribe();
       }

    },[])


  let authInfo ={
     user, 
     loading,
     createForUser,
     sigIn,
     updateProfiel,
     providerLogin,
     logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
       {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;