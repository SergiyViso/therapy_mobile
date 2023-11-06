/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import SplashScreen from './src/screens/SplashScreen'
import AppNavigation from './navigations/AppNavigation';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';
import { colors } from './src/components/Colors';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
PushNotification.configure({
  onRegister: function (token) {
    // console.log('FCM token value is the', token)
  },
  popInitialNotification: true,
  requestPermissions: true
})


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App = () => {
 

  const [permissions, setPermissions] = useState({});
  const [deviceToken, setDeviceToken] = useState("")
  const [value, setValue] = useState(false)

  useEffect(() => {
    requestUserPermission()
    getFcmToken()
  }, [])
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem("savedFcmToken")
    // console.log(checkToken, "the token we get notificationservices");
    if (!checkToken) {
      try {
        const fcmToken = await messaging().getToken()
        // console.log("the fcm token we get is here. ", fcmToken);
        if (!!fcmToken) {
          // console.log("fcm token generated", fcmToken)
          await AsyncStorage.setItem("savedFcmToken", fcmToken)
        }
      } catch (error) {
        console.log("error message", error)
      }

    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // alert(JSON.stringify(remoteMessage));
      PushNotification.createChannel(
        {
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => {
          // alert("tyytytyytyt")
          PushNotification.localNotificationSchedule({
            title:'My notification title',
            date:new Date(new Date().getTime()+3000),
            message:'My notification Message',
            allowWhileIdle:false,
            channelId: "channel-id"
          });
          // const notificationRequest = {
          //   id: 'channel-id', // Unique identifier for the notification
          //   title: 'Scheduled Notification',
          //   body: 'This is a scheduled notification.',
          //   // fireDate: new Date().toISOString(),
          // };
      
          // PushNotificationIOS.addNotificationRequest(notificationRequest);
        } // (optional) callback returns whether the channel was created, false means it already existed.
      );
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //   alertTitle: remoteMessage.notification.title,
      //   alertBody: remoteMessage.notification.body
      // })
    });
    return () => unsubscribe();

  }, [])
  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      JSON.stringify(remoteMessage.notification.body)
      console.log(remoteMessage, "remoteMessage")

    })
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      JSON.stringify(remoteMessage.notification.body)
      const channelId = Math.random().toString(36).substring(7)
      // showNotification(channelId, { bigImage: remoteMessage.notification.android.imageUrl, title: remoteMessage.notification.title, message: remoteMessage.notification.body, subText: remoteMessage.data.subTitle })
    })

  }, [])

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={styles.style}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={styles.text1Style}
        text1NumberOfLines={5}
        text2Style={styles.text2Style}
        text2NumberOfLines={5}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={[styles.style, styles.errorStyle]}
        contentContainerStyle={styles.contentContainerStyle}
        text1Style={styles.text1Style}
        text1NumberOfLines={5}
        text2Style={styles.text2Style}
        text2NumberOfLines={5}
      />
    ),
  };
  return (
    <Provider store={store}>
    <AppNavigation />
    <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} position='bottom' />
  </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
