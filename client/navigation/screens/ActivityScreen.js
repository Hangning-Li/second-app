import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import Todos from '../../components/ToDos';

// import messaging from '@react-native-firebase/messaging';
// import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';



export default function ActivityScreen() {
    const background = require("../../assets/images/background.jpg");

    // const navigation = useNavigation();
    // const [loading, setLoading] = useState(true);
    // const [initialRoute, setInitialRoute] = useState('Home');

   

    // useEffect(() => {
    //     // Assume a message-notification contains a "type" property in the data payload of the screen to open

    //     messaging().onNotificationOpenedApp(remoteMessage => {
    //         console.log(
    //             'Notification caused app to open from background state:',
    //             remoteMessage.notification,
    //         );
    //         navigation.navigate(remoteMessage.data.type);
    //     });

    //     // Check whether an initial notification is available
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             if (remoteMessage) {
    //                 console.log(
    //                     'Notification caused app to open from quit state:',
    //                     remoteMessage.notification,
    //                 );
    //                 setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
    //             }
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return null;
    // }

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