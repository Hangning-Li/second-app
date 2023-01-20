import * as React from 'react';
import MainConatiner from './navigation/MainContainer';
import { useEffect } from 'react';
import {requestUserPermission, NotificationListener} from './src/utils/pushnotification_helper'
import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDbDd57FY0vZFONeo96OpsjEQvle8Y0SPs",
    authDomain: "my-app-99460.firebaseapp.com",
    projectId: "my-app-99460",
    storageBucket: "my-app-99460.appspot.com",
    messagingSenderId: "817428706061",
    appId: "1:817428706061:web:5591cabe0385626ae63644",
    measurementId: "G-NG65SRZTZ0"
  };
  
const app = initializeApp (firebaseConfig);

function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();

  }, [])


  return (
    <>
      <MainConatiner />
    </>
  );
}

export default App;