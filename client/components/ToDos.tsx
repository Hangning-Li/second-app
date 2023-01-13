import React, {useState} from 'react';
import { StyleSheet,View, FlatList } from 'react-native';
import ToDoList from './ToDoList';
import { v4 as uuid } from 'uuid';

const arr = [
    { 'id': uuid(), 'content': 'to-do-list-1', 'color':'red', 'checked':false },
    { 'id': uuid(), 'content': 'to-do-list-2', 'color':'green', 'checked':false },
    { 'id': uuid(), 'content': 'to-do-list-3', 'color':'blue', 'checked':false }
];

const Todos = () => {

    return (
        <View style={styles.container}>
            <FlatList style={styles.list}
                data={arr}
                renderItem={(item: any) => {
                    return (
                      <ToDoList data={item.item}/>
                    )
                  }
                }
                keyExtractor={(item) => item.id}
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
    text: {
        color: 'white',
        width: '100%',
    }
});