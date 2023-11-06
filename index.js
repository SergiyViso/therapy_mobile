/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging'
import {name as appName} from './app.json';
PushNotification.configure({

    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);
    },
    senderID: "XXXXXX", //This is hidden to protect my own project 
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  })
    messaging().setBackgroundMessageHandler(async remotemessage => {
      PushNotification.createChannel(
        {
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
    
        (created) => {
    
          PushNotification.localNotification({
            // / Android Only Properties /
            channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: remotemessage.notification.title, // (optional)
            message: remotemessage.notification.body, // (required)
          });
        }
      );
    })
AppRegistry.registerComponent(appName, () => App);
