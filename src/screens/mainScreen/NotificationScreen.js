import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { images } from '../../components/Images'
import { colors } from '../../components/Colors'
import { therapyList, timimgs, titles } from '../../utils/utils'
import database from '@react-native-firebase/database';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import LoadingComponent from '../../components/LoadingComponent'
import { getUserNotificationData } from '../../../redux/actions/mainAction'

const NotificationScreen = (props) => {
  const userDetails = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.accessToken)
  const [checkDate, setCheckDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [checkTiming, setCheckTiming] = useState(moment(new Date()).format('hh:mm:ss'))
  const [title, setTitles] = useState(titles)
  const [isHide, setIsHide] = useState(false)
  const [count, setCount] = useState(0)
  const [loader, setLoader] = useState(false)
  const [notificationsData1, setNotificationsData1] = useState([])
  const [data, setData] = useState([])
  console.log(notificationsData1,"fsdfhdshdsfhdfhd");
  const IsFocused = useIsFocused()
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1)
      setCheckTiming(moment(new Date()).format('hh:mm:ss'))
      setCheckDate(moment(new Date()).format('YYYY-MM-DD'))
      getNotificationList()
    },10000)
  }, [count])
  console.log(checkDate,"<<========>>",checkTiming);
const dispatch = useDispatch()
  useEffect(() => {
    // getNotificationList()
  }, [])
  const getNotificationList = async()=>{
    dispatch(getUserNotificationData(token,checkDate.toString(),checkTiming.toString())).then(async res=>{
      console.log(JSON.stringify(res));
      if (res.status == true) {
        setNotificationsData1(res.data.reverse())
        
      }
    }).catch(e=>{
      console.log(e);
    })
  }
  const  sortingFunction = (data)=>{
    if (data.length != 0) {
        const sorted = data.sort((a, b) => {
            const dateA = new Date(`${a.notificationTime}`).valueOf();
            const dateB = new Date(`${b.notificationTime}`).valueOf();
            if (dateB > dateA) {
                return 1; // return -1 here for DESC order
            }
            return -1 // return 1 here for DESC Order
        });
        setNotificationsData1(sorted)
    }
}
  const handlePress = (index) => {
    if (index == 1) {
      setIsHide(true)
    } else {
      setIsHide(false)
    }
    let newArr = [...title]
    newArr.map((item, ind) => {
      index == ind ? item.isSelected = true : item.isSelected = false
      return { ...item }
    })
    setTitles(newArr)
  }
  function convertTimeFormat(time) {
    var parts = time.split(':'); // Split the time into hours, minutes, and seconds
  
    // Extract hours and minutes
    var hours = parts[0];
    var minutes = parts[1];
  
    // Concatenate the hours and minutes into the desired format
    var convertedTime = hours + ':' + minutes;
  
    return convertedTime;
  }
  const renderNotifications = ({ item }) => {
    // console.log(item,"dsgsdgsdgs");
    // console.log(moment.utc(item.date).local().startOf('seconds').fromNow().includes("in"));
    const date1 = new Date();
    const date2 = new Date(item.notificationTime);
    return (
      //  Number(checkDate)   == Number(moment(item.date).format("YYYY-MM-DD"))  ?
      // date1 > date2 &&
      <TouchableOpacity style={styles.notificationBox} >
        <View style={styles.textBox}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDes}>{item.description}</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.notificationTime}>{convertTimeFormat(item.time)}</Text>
        </View>
      </TouchableOpacity>
    )
  }
// useEffect(()=>{
//   if (notificationsData1.length != 0 ) {
//     sortingFunction(notificationsData1)
//   }
// },[notificationsData1])
  // console.log(data);
  // useEffect(() => {

  //   setLoader(true)
  //   const userRef = database().ref(`/notificationList/${userDetails.id}`).orderByChild("id").equalTo(userDetails.id)
  //     .once("value", snapshot => {
  //         setNotificationsData1([])
  //         snapshot.forEach(function (childsnapshot) {
  //           setNotificationsData1(notificationsData1 => [...notificationsData1, childsnapshot.val()])
  //         })
  //         setLoader(false)
  //     });
  // }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     let arrData = [...notificationsData1]
  //     arrData = arrData.sort((a, b) => {
  //       return b.time - a.time
  //     })
  //     setLoader(false)
  //     setData(arrData)
  //   }, 500)
  // }, [notificationsData1])
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <MainHeader menu />
      <View style={styles.lowerHeader}>
        {loader && <LoadingComponent />}
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={images.redBackIcon}
            style={styles.redBackIcon}
            resizeMode='stretch'
          />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Notifications</Text>
      </View>
      <View style={styles.titlesBox}>
        {
          title.map((item, index) => {
            return (
              <>
                <View>
                  <Text onPress={() => handlePress(index)} style={styles.title(item.isSelected)}>{item.title}</Text>
                  {
                    item.isSelected &&
                    <View style={styles.blueLine(item)}></View>
                  }
                </View>
                {
                  item.count &&
                  <View style={styles.countCircle}>
                    <Text style={{ fontSize: moderateScale(10) / fontScalingFactor, color: colors.white }}
                    >{item.count}</Text>
                  </View>
                }
                
              </>
            )
          })
        }
      </View>
      {
        !isHide &&
        <View style={{height:windowHeight-scale(280)}}>

        <FlatList
          data={notificationsData1}
          renderItem={renderNotifications}
          keyExtractor={item => item.id}
          />
          </View>
      }
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  lowerHeader: {
    flexDirection: "row",
    height: scale(30),
    width: windowWidth - scale(30),
    alignSelf: "center",
    marginTop: scale(20),
    paddingHorizontal: scale(10),
    alignItems: "center"
  },
  redBackIcon: {
    height: scale(15),
    width: scale(10)
  },
  mainTitle: {
    color: colors.signUpBtn,
    fontSize: moderateScale(20) / fontScalingFactor,
    alignSelf: "center",
    fontWeight: "700",
    paddingLeft: "30%",
    // backgroundColor:"red"
  },
  titlesBox: {
    flexDirection: "row",
    height: scale(40),
    width: windowWidth - scale(30),
    alignSelf: "center",
    marginTop: scale(20),

    alignItems: "center",
    // backgroundColor: "grey"
  },
  title: (isSelected) => {
    return {

      color: colors.signUpBtn,
      fontSize: moderateScale(13) / fontScalingFactor,
      // alignSelf: "center",
      fontWeight: "400",
      marginRight: scale(40),
      marginLeft: scale(10),
      // textDecorationLine:isSelected?"underline":"none"

    }
  },
  countCircle: {
    height: scale(18),
    width: scale(18),
    borderRadius: scale(10),
    backgroundColor: colors.buttonColor,
    marginLeft: scale(-35),
    alignItems: "center",
    justifyContent: "center"
  },
  blueLine: (item) => {
    return {

      height: 1,
      width: item.title == "Therapy" ? scale(70) : scale(100),
      backgroundColor: colors.signUpBtn,
      marginTop: scale(5),
      position: "absolute", bottom: scale(-5)
    }
  },
  notificationBox: {
    height: verticalScale(60),
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    width: windowWidth - scale(40),
    alignSelf: "center"
  },
  textBox: {
    height: "100%",
    width: "80%",
    justifyContent: "center",
    padding: scale(4)
  },
  timeBox: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  notificationTitle: {
    fontSize: moderateScale(13) / fontScalingFactor,
    fontWeight: "700",
    // fontFamily: "Inter",
    color: colors.black
  },
  notificationDes: {
    fontSize: moderateScale(9) / fontScalingFactor,
    fontWeight: "400",
    // fontFamily: "Inter",
    color: colors.black
  },
  notificationTime: {
    fontSize: moderateScale(11) / fontScalingFactor,
    fontWeight: "400",
    // fontFamily: "Inter",
    color: colors.greyText,
    position: "absolute",
    top: "48%"
  }


})