import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Todos from '../../components/ToDos';

export default function ActivityScreen() {
    const background = require("../../assets/images/background.jpg");



    return (
        // <Stack.Navigator initialRouteName={initialRoute}>
        <ImageBackground source={background} style={styles.container}>
            <Todos />
        </ImageBackground>
        // </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    // Styles that are unchanged from previous step are hidden for brevity. 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});