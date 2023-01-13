import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ITodo from "../models/todo";
import axios from 'axios';
import moment from 'moment';
// import messaging from '@react-native-firebase/messaging';

interface ITodoProps {
  data: ITodo
}

const ToDoList = (props: ITodoProps) => {

  const [isDone, setDone] = useState(false);
  // const db = getFirestore(app);

  async function addTodo() {
    let dateTime = new Date();
    let taskTime = "";

    if (isDone === false) {
      axios.post('http://localhost:8000/add_to_do', {
        id: props.data.id,
        date: dateTime
    }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          alert(response.data);
          setDone(true);
          // set timer for a week
        })
        .catch(function (error) {
          alert(error);
        });
      // alert("a task is selected successfully");

    }

  }

  // async function PushNotifications(){
  //   messaging().sendMessage({
  //     data:{
  //       "content": "it works!"
  //     }
  //   })
  // }

  return (
    <View style={[styles.container, { backgroundColor: props.data.color }]}>
      <BouncyCheckbox
        fillColor="black"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "black" }}
        isChecked={isDone}
        onPress={()=>{
          addTodo();
          // PushNotifications(props.data);
        }}
        style={styles.checkbox}
      // disabled={true}
      />
      <Text style={styles.text}>{props.data.content}</Text>
    </View>
  );
}

export default ToDoList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    opacity: 0.8,
  },
  checkbox: {
    width: 40,
    minWidth: 40, height: 40,
  },
  text: {
    color: 'white',
    width: '100%',
  }
});