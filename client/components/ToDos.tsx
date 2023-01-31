import React, { useId, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { v4 as uuid } from 'uuid';
import ITodo from "../models/todo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sendNotificationFirebaseAPI } from '../src/utils/pushnotification_helper';

const title = 'Push Notificaition';
const body = 'Your task has been selected successfully!'
const ttl = 7 * 24 * 60 * 3600 // s

const arr = [
    { 'id': uuid(), 'content': 'to-do-list-1', 'color': 'red', },
    { 'id': uuid(), 'content': 'to-do-list-2', 'color': 'green' },
    { 'id': uuid(), 'content': 'to-do-list-3', 'color': 'blue' }
];

type ItemProps = {
    item: ITodo;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const getToken = async () => {
    try {
      const fcmtoken = await AsyncStorage.getItem('fcmtoken');
      return fcmtoken;
    } catch(e) {
      // error reading value
      console.log("get fcmtoken error: ", e);
    }
  }
  

const Todos = () => {
    const [selectedId, setSelectedId] = useState<string>();
    const [isDone, setDone] = useState(false);
    const [disable, setDisable] = useState(false);
    console.log("disable: ", disable);

    const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
        <>
            <View>
                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.item, { backgroundColor }]}
                    disabled={disable}
                >
                    <Text style={[{ color: textColor }]}>{item.content}</Text>
                </TouchableOpacity>
            </View>
        </>
    );

    const renderItem = ({ item }: { item: ITodo }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';
        let dateTime = new Date();
        const bodyToSend = JSON.stringify({
            id: item.id,
            userid: uuid(),
            date: dateTime,
            ttl: ttl
        })
        
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);    
                    if (isDone === false && disable === false) {
                        axios({
                            method: 'post',
                            url: 'http://10.0.2.2:8000/add_to_do',
                            data: bodyToSend,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                            .then(function (response) {
                                setDone(true);
                                setDisable(true);
                                // push notifications
                                getToken().then((value) => {
                                    const token: string = value;
                                    console.log("token: ", token)
                                    sendNotificationFirebaseAPI(token,title,body);
                                  });                                
                            })
                            .catch(function (error) {
                                if (error.response) {
                                    // Request made and server responded
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);
                                } else if (error.request) {
                                    // The request was made but no response was received
                                    console.log(error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.log('Error', error.message);
                                }
                            })
                        setDone(true);
                    } else {
                        alert("your have selected your task")
                    }

                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    }


    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                data={arr}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>
    );
}

export default Todos

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
    },
    list: {
        height: 500,
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        overflow: 'scroll',
    },
    checkbox: {
        width: 40,
        minWidth: 40, height: 40,
    },
    text: {
        color: 'white',
        width: '100%',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});