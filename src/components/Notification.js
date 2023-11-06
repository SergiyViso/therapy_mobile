import axios from 'axios';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Notification =async (notification) => {
    const headers = {
        Authorization: `key=AAAADDq16ng:APA91bEGTUYYzfhlCW-9RAba6V7G5RVG_5qHJdFyEWwUTsro-dIRlJ843iVdN0iUMKegT4hAwelS7W_8enIRekHyPQc7lQ93wE6LxtoEf5BJOOkD-_hSRsak1ELmqn219wW3s4qhR_Bx`,
        'Content-Type': 'application/json',
      }
    
      const bodyToSend = JSON.stringify({
        to: notification.token,
        notification: {
          title:notification.title,
          body:notification.body,
          date:notification.date
        },
      })
    
        await axios({
          method: 'post',
          url: 'https://fcm.googleapis.com/fcm/send',
          headers: headers,
          data: bodyToSend,
        }).then((response)=>{
            console.log("*****************************notification response",response.data);
        })
      
}




export default Notification;

const styles = StyleSheet.create({

})
