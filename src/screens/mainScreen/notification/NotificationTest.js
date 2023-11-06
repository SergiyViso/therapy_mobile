import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification from 'react-native-push-notification';
import { Table, Row, Rows } from 'react-native-table-component';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../components/Colors';
import { fontScalingFactor } from '../../../components/CommonStyles';

const NotificationTest = () => {
  const date = new Date()
  const [first, setfirst] = useState(0)
  useEffect(() => {
    handleFirstState()
    //  alert(first)
    if (first == 13) {
      noti()
    }
  }, [])

  function handleFirstState() {
    setTimeout(() => {
      setfirst(first + 1)
    }, 5000)
  }
  function noti() {

    PushNotification.createChannel(

      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
        // id: "reminders"
      },
      (created) => {
        PushNotification.localNotification({
          title: "eventTitle",
          // date: new Date(Date.now() + (600 * 1000)),
          message: "threeDaysMsg",
          allowWhileIdle: false,
          channelId: "reminders",
          // repeatType: 'week',
          // repeatTime: 3
        });


      },
    );
  }
  const data = [
    { id: 0, title: "Prise en charge", amount: "123457", count: "2", num: "" },
    { id: 1, title: "État civil", amount: "123457", count: "1", num: "" },
    { id: 2, title: "Situation professionnelle", amount: "123457", count: "3", num: "" },
    { id: 3, title: "Êtes-vous propriétaire ?", amount: "123457", count: "1", num: "" },
    { id: 4, title: "Nombre de bien", amount: "123457", count: "0", num: "1" },
    { id: 5, title: "Avez-vous des actions ou des cryptomonnaies ?", amount: "123457", count: "2", num: "0" },
    { id: 6, title: "Nombre de portefeuilles", amount: "123457", count: "9", num: "1" },
    { id: 7, title: "Sous-total", amount: "123457", count: "6", num: "0" },
  ]
  const renderUpperTable = ({ item, index }) => {
    return (
      <View style={styles.hori_Box(data, index)}>
        <View style={{ width: "25%", marginVertical: 0.1, borderRightWidth: 0.8, zIndex: -90, borderColor: "#E0E0E0" }}>
          <Text style={{ paddingVertical: verticalScale(8), paddingHorizontal: scale(8) }}>{item.title}</Text>
        </View>
        <View style={{ width: "25%", marginVertical: 0.1, borderRightWidth: 0.8, zIndex: -90, borderColor: "#E0E0E0" }}>
          <Text style={{ paddingVertical: verticalScale(8), paddingLeft: scale(8) }}>{item.count}</Text>
        </View>
        <View style={{ width: "25%", marginVertical: 0.1, borderRightWidth: 0.8, zIndex: -90, borderColor: "#E0E0E0" }}>
          <Text style={{ paddingVertical: verticalScale(8), paddingLeft: scale(8) }}>{item.num}</Text>
        </View>
        <View style={{ width: "25%", marginVertical: 0.1, zIndex: -90 }}>
          <Text style={{ paddingVertical: verticalScale(8), paddingLeft: scale(8) }}>{item.amount}</Text>
        </View>

      </View>
    )
  }
  return (
    <View>
      <Text onPress={() => noti()} style={{ top: 50, fontSize: 20, color: "red", alignSelf: "center" }}>NotificationTest</Text>
    </View>
    // <View style={styles.container}>
    //   <View style={styles.headerBox}>
    //     <Text style={styles.upperTableHeader}>Déclaration d'impôt 2022</Text>
    //   </View>
    //   <FlatList
    //     data={data}
    //     keyExtractor={item => item.id}
    //     renderItem={renderUpperTable}
    //   />
    // </View>


  )
}

export default NotificationTest

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  hori_Box: (data, index) => {
    return {
      width: "100%", marginVertical: 0.1,
      borderBottomWidth: index != (data.length - 1) ? 0.8 : 0, flexDirection: "row", borderColor: "#E0E0E0"
    }
  },
  headerBox: {
    height: verticalScale(40),
    width: "100%",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: "#E9571E",
    justifyContent: "center",
    paddingLeft: scale(14)
  },
  upperTableHeader: {
    fontSize: moderateScale(16) / fontScalingFactor,
    color: colors.white, fontWeight: "700"
  }
})
