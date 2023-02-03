import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GOOGLE_FCM_KEY = 'AAAAvlKMMw0:APA91bGSyR4sKTaulo7G5pyWHFiRBlOJ0dsxOtvgKRu7gO7YxCztVMbO3ABdc0Sw9AOVh1jomgaIQXWd8_SaZ4lETuxgB8sFb3wGAI82zhmwt-tb9yNPdNJwwVNOH4O0RASEMPYFZ-v2';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken();
    }
}

export const GetFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("old fcmtoken: ", fcmtoken)
    if (!fcmtoken) {
        try {
            let fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log("the new generated fcmtoken: ", fcmtoken)
                AsyncStorage.setItem("fcmtoken", fcmtoken);
            } else {
                console.log("fcmtoken error!");
            }
        } catch (error) {
            console.log(error, "error in fcmtoken")
        }
    }
}

export const NotificationListener = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("Notifcation on !", remoteMessage);
    })
}

export const sendNotificationFirebaseAPI = async (
    token: string,
    title: string,
    body: string,
    data?: object,
) => {
    if (token != '') {
        const headers = {
            Authorization: `key=${GOOGLE_FCM_KEY}`,
            'Content-Type': 'application/json',
        }

        const bodyToSend = JSON.stringify({
            to: token,
            notification: {
                title,
                body,
                "sound": 1,
                "show_in_foreground": true,
                "priority": "high",
                "content_available": true
            },
            data,
        })
        
        await axios({
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            headers: headers,
            data: bodyToSend,
        }).catch(function (error) {
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
    }
}