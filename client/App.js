import * as React from 'react';
import MainConatiner from './navigation/MainContainer';
import { useEffect } from 'react';
import {requestUserPermission, NotificationListener} from './src/utils/pushnotification_helper'

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