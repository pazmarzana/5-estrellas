import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/firebase';
import * as firebase from "firebase";

LogBox.ignoreLogs(["Setting a timer"]);
// LogBox.ignoreLogs(['Warning: ...']);
export default function App() {

  // useEffect(() => {
  //   firebaseApp.auth().onAuthStateChanged((user)=>{
  //     console.log(user);
  //   });
  // }, []);

  return (
    <Navigation />
  );
}