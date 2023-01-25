import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { v4 as uuid } from 'uuid';
import ITodo from "../models/todo";
import axios from 'axios';

const arr = [
    { 'id': uuid(), 'content': 'to-do-list-1', 'color': 'red' },
    { 'id': uuid(), 'content': 'to-do-list-2', 'color': 'green' },
    { 'id': uuid(), 'content': 'to-do-list-3', 'color': 'blue' }
];

// var disable = false;

type ItemProps = {
    item: ITodo;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

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

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    let dateTime = new Date();
                    if (isDone === false && disable === false) {
                        axios.post('http://localhost:8000/add_to_do', {
                            id: item.id,
                            date: dateTime
                        }, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                            .then(function (response) {
                                alert(response.data);
                                setDone(true);
                                setDisable(true);
                                // set timer for a week
                            })
                            .catch(function (error) {
                                alert(error);
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
                // renderItem={(item: any) => {
                //     return (
                //       <ToDoList data={item.item}/>
                //     )
                //   }
                // }
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