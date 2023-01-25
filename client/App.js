import * as React from 'react';
import MainConatiner from './navigation/MainContainer';
import { useEffect } from 'react';
import {requestUserPermission, NotificationListener} from './src/utils/pushnotification_helper'
import {initializeApp} from "firebase/app";
import { getFirestore, doc, getDoc  } from 'firebase/firestore';

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
const db = getFirestore(app);
const docRef = doc(db, "data", "user");
const docSnap = getDoc(docRef);

async function sendMessage(){
  await admin.messaging().sendMulticast({
    tokens: [
      "d2TwtSpyTAema0bsod0joA:APA91bEAIdblgRSrMCrkdSGc3jq1LOPnAayhn7zcoeEqy1rxxo-xpwEtSrHmKQq8RsRf_BDO4L2c-kUB4ZqfD1eLtO1r5S9ZaTeQzjizABGRdjrL_7gDW9mGSQE5oF2F2-3UVUsc0MTq"
    ], 
    notification: {
      title: 'Task Selection',
      body: 'you have selected a task',
      imageUrl: 'https://my-cdn.com/app-logo.png',
    },
  });
}

function App() {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    sendMessage();

  }, [docSnap])


  return (
    <>
      <MainConatiner />
    </>
  );
}

export default App;