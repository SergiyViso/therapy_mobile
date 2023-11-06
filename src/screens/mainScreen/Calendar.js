import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Platform, ScrollView, TextInput } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCalendarEvent, eventCellCalender, getCalendarData, postUserNotificationData, updateCalendarEvent } from '../../../redux/actions/mainAction';
import { colors } from '../../components/Colors';
import database from '@react-native-firebase/database';
import CommonButtons from '../../components/CommonButtons';
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import { images } from '../../components/Images';
import LoadingComponent from '../../components/LoadingComponent';
import MainHeader from '../../components/MainHeader'
import DatePicker from 'react-native-date-picker'
import { Button } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: false,
    sound: false,
  },
});
const CalendarScreen = (props) => {
  const token = useSelector(state => state.auth.accessToken)
  const userDetails = useSelector(state => state.auth.user)
  const CalendarDataList = useSelector(state => state.main.calendarData)
  const [modal2, setModal2] = useState(false)
  const [loader, setLoader] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [dateString, setDateString] = useState('')
  const [btnName, setBtnName] = useState(false)
  const [eventDescription, setEventDescription] = useState('')
  const [creatingType, setCreatingType] = useState('')
  const [eventId, setEventId] = useState('')
  const [modal1, setModal1] = useState(false)
  const [items, setItems] = useState(CalendarDataList)
  const [timeToSend, setTimeToSend] = useState("")
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [dateAfterWeek, setDateAfterWeek] = useState('')
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch()
  const navigation = useNavigation()

  // alert(date)

  const schedulePushNotification = () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 4);
    const notificationRequest = {
      id: 'channel-id', // Unique identifier for the notification
      title: 'Scheduled Notification',
      body: 'This is a scheduled notification.',
      fireDate: date.toISOString(),
    };

    PushNotificationIOS.addNotificationRequest(notificationRequest);

  };


  useEffect(() => {
    if (items.length != 0) {
      setTimeout(()=>{

        fetchMarkedDates();
      },1000)
    }
  }, [items]);

  const fetchMarkedDates = () => {
    const apiResponse = items

    const updatedMarkedDates = {};
    updatedMarkedDates[currentDate] = {
      marked: true,
      // dotColor: colors.signUpBtn,
      selectedColor:"#00adf5",
      selected: true,
    };
    apiResponse.forEach((item) => {
      const startsAtDate = new Date(item.starts_at);
      const date = startsAtDate.toISOString().split('T')[0];
      updatedMarkedDates[date] = {
        marked: true,
        // dotColor: colors.signUpBtn,
        selectedColor:colors.buttonColor,
        selected: true,
        data: { title: item.title, description: item.description },
      };
    });
    

    setMarkedDates(updatedMarkedDates);
  };




  // console.log(typeof date, "sadgfasdgahad")
  // console.log(creatingType,"creatingTypecreatingTypecreatingType")
  // const dateToSendToApi = ()=>{
  //   let initialDate = date
  //   const updatedDate = new Date(initialDate.getTime() - 24 * 60 * 60 * 1000);
  //   console.log(updatedDate,"dsfdffngfgnfgnfgnfgnfggfgf");
  // }
  const notificationMessage = `You have a ${creatingType} tomorrow, don't forget to add notes for your session!`
  useEffect(() => {
    // dateToSendToApi()
    // console.log("what is the currentDatecurrentDate", date)
    //Orientation.lockToPortrait();
    // Assuming createdDate is a string containing the created date in ISO 8601 format, e.g. "2022-04-01T00:00:00.000Z"
    const createdDate = userDetails.created_at;
    const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000; // 2 weeks * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
    // Convert the created date to milliseconds and add two weeks
    const twoWeeksLaterInMilliseconds = new Date(createdDate).getTime() + twoWeeksInMilliseconds;
    // Convert the milliseconds back to a Date object and format it as a string
    const twoWeeksLaterDate = new Date(twoWeeksLaterInMilliseconds).toISOString().substring(0, 10);
    setDateAfterWeek(twoWeeksLaterDate)
    calendarListt()

  }, [])
  useEffect(() => {
    if (CalendarDataList.length != 0) {
      const sorted = CalendarDataList.sort((a, b) => {
        const dateA = new Date(`${a.created_at}`).valueOf();
        const dateB = new Date(`${b.created_at}`).valueOf();
        if (dateB > dateA) {
          return 1; // return -1 here for DESC order
        }
        return -1 // return 1 here for DESC Order
      });
      setItems(sorted)
    }

  }, [CalendarDataList])

  const calendarListt = () => {
    dispatch(getCalendarData(token)).then(res => {
      // console.log(res);
    }).catch(e => {
      console.log(e);
      errorToast("Network Error")
    })
  }
  // const now = new Date();

  // console.log(new Date(now.getFullYear(), now.getMonth(), now.getDate(), -48, 0, 0),"sdfhdshhshshfh");
  // console.log(new Date(), "werhgfdshdsfhdsfhds")
  const schduleNotification = (date) => {
    // alert(date)

    let initialDate = date
    // alert(initialDate)
    const now = new Date();
    const threeDaysBefore = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), -72, 0, 0); // Set it to today at 12:00 PM
    const appointmentDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 6, 0, 0); // Set it to today at 12:00 PM
    const updatedDate = new Date(initialDate.getTime() - 24 * 60 * 60 * 1000);
    const threeDaysMsg = `You have a ${creatingType} on ${moment(initialDate).format('D MMMM h:mm a')}, don't forget to add notes for your session!`
    const sameDateMsg = `You have a ${creatingType} today, don't forget to add notes for your session!`

    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'reminders', // (required)
          channelName: 'Task reminder notifications', // (required)
          channelDescription: 'Reminder for any tasks',
          // id: "reminders"
        },
        (created) => {
          PushNotification.localNotificationSchedule({
            title: eventTitle,
            date: threeDaysBefore,
            message: threeDaysMsg,
            allowWhileIdle: false,
            channelId: "reminders",
            // repeatType: 'week',
            // repeatTime: 3
          });
          PushNotification.localNotificationSchedule({
            title: eventTitle,
            date: appointmentDate,
            message: sameDateMsg,
            allowWhileIdle: false,
            channelId: "reminders",
            // repeatType: 'week',
            // repeatTime: 3
          });

        },
      );
    } else {
      var date1 = new Date();
      let checkDate = moment(date1).format("YYYY-MM-DD")
      var date2 = moment(date).format("YYYY-MM-DD")
      if (date2 == checkDate) {
        const request2 = {
          id: 'reminders',
          // fireDate: date.toISOString(),
          title: eventTitle,
          body: sameDateMsg,
        };
        PushNotificationIOS.addNotificationRequest(request2);
      }
      else{
        const request2 = {
          id: 'reminders',
          fireDate: date.toISOString(),
          title: eventTitle,
          body: sameDateMsg,
        };
        PushNotificationIOS.addNotificationRequest(request2);
      }
    }
    // successToast("sent")
  }
  const handleClick = (type) => {
    setCreatingType(type)
    setModal1(false)
    setTimeout(() => {

      setModal2(true)
    }, 400)
  }
  const Alertpopup = () => {
    Alert.alert('Subscribe', 'For access this buy the plan', [
      // {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //     style: 'cancel',
      // },
      { text: 'OK', onPress: () => props.navigation.navigate('PlanScreen') }
    ])
  }

  const renderEmptyDate = () => {
    return (
      null
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const dayPress = (item) => {
    // alert(JSON.stringify(item))
    setDate(new Date(item.dateString))
    setDateString(item.dateString)
    setModal1(true)
    setModal2(true)
    setBtnName(false)

  }

  const resetData = () => {
    setEventTitle("")
    setEventDescription("")
    setTimeToSend("")
  }

  // const postNotificationData = async (date) => {
  //   let initialDate = date
  //   const updatedDate = new Date(initialDate.getTime() - 24 * 60 * 60 * 1000);
  //   var formdata = new FormData()
  //   formdata.append('title', eventTitle)
  //   formdata.append('description', notificationMessage)
  //   formdata.append('notification_time', moment(updatedDate).format('hh:mm a').toString())
  //   formdata.append('date', updatedDate.toString())
  //   formdata.append('time', moment(updatedDate).format('hh:mm:ss').toString())
  //   console.log(formdata, "ofrdkusiahdm");
  //   await dispatch(postUserNotificationData(token, formdata)).then(async res => {
  //     console.log(JSON.stringify(res));

  //   }).catch(e => console.log(e, "errrorrrr"))

  // }

  const postNotificationData = async () => {
    // alert(timeToSend)
    // let dateee = new Date(dateString)
    var formdata = new FormData()
    formdata.append('title', creatingType)
    formdata.append('description', `You have a ${creatingType} today, don't forget to add notes for your session!`)
    formdata.append('notification_time', timeToSend.toString())
    formdata.append('date', dateString.toString())
    formdata.append('time', moment(timeToSend).format('hh:mm:ss').toString())
    console.log(formdata, "ofrdkusiahdm");
    await dispatch(postUserNotificationData(token, formdata)).then(async res => {
      console.log(JSON.stringify(res),"jyhfhfggggggjfjhfjhfjhfhjhj");

    }).catch(e => console.log(e, "errrorrrr"))

  }

  const handleAdd = () => {
    // if (eventTitle.trim() == "") {
    //   errorToast("Please Enter Therapy Session")
    // } else
    if (eventDescription.trim() == "") {
      errorToast("Please Enter Description")
    }
    else if (timeToSend == "") {
      errorToast("Please Select-Time")
    }
    else {
      setModal1(false)
      setModal2(false)
      setTimeout(()=>{


      setLoader(true)
      var formdata = new FormData()
      formdata.append("title", creatingType)
      formdata.append("description", eventDescription)
      formdata.append("height", 12)
      formdata.append("day", dateString)
      formdata.append("starts_at", timeToSend)
      formdata.append("type", creatingType)
      // formdata.append("schedule_date", date.toString())
      console.log("formdata us the", formdata)
      dispatch(eventCellCalender(token, formdata)).then(async res => {
        await console.log(res, "uoooiiouoij");
        if (res.success) {
          calendarListt()
          setLoader(false)
          setModal2(false)
          resetData()
          successToast(res.message)
          // setDataBase(date)
          schduleNotification(date)
          postNotificationData(date)
        } else {
          // alert(res)
          setLoader(false)
          errorToast(res.message)
        }
      }).catch(e => {
        console.log(e, "dgdgdsgsdgsdg");
        setLoader(false)
        errorToast("Network error")

      })
    },1000)
    }
  }
  const handleUpdate = () => {
    // if (eventTitle.trim() == "") {
    //   errorToast("Please Enter Therapy Session")
    // } else 
    if (eventDescription.trim() == "") {
      errorToast("Please Enter Description")
    }
    else if (timeToSend == "") {
      errorToast("Please Select-Time")
    }
    else {
      setLoader(true)
      var objToSend = JSON.stringify({
        title: creatingType,
        description: eventDescription,
        height: 12,
        day: dateString,
        type: creatingType,
        starts_at: timeToSend
      })
      // console.log(objToSend, "askggsalkajkshakljsfhkaljshkajsf", eventId);
      dispatch(updateCalendarEvent(token, objToSend, eventId)).then(async res => {
        if (res.success) {
          calendarListt()
          setLoader(false)
          setModal2(false)
          // postNotificationData(date)
          resetData()
          schduleNotification(date)
          successToast(`${creatingType} updated successfully`)
          // schduleNotification(date)
          // setDataBase()
        } else {
          // alert(res)
          setLoader(false)
          errorToast(res.message)
        }
      }).catch(e => {
        console.log(e, "dgdgdsgsdgsdg");
        setLoader(false)
        errorToast("Network error")

      })
    }
  }
  const handleDelete = () => {
    setLoader(true)
    dispatch(deleteCalendarEvent(token, eventId)).then(res => {
      console.log(res, "delete event response");
      calendarListt()
      setLoader(false)
      setModal2(false)
      resetData()
      successToast("Deleted Successfuly")
    }).catch(e => {
      errorToast("Network Error")
      console.log(e);
      setLoader(false)
    })
  }
  // setLoader(false)
  const handlePress = (item) => {
    setModal1(false)
    // setTimeout(()=>{

    setModal2(true)
    setEventTitle(item.title)
    setEventDescription(item.description)
    setBtnName(true)
    setDateString(item.day)
    setCreatingType(item.type)
    setEventId(item.id)
    setTimeToSend(item.starts_at)
    console.log(item.day, "item.item.day");
    // },400)
  }
  // console.log(JSON.stringify(items),"jgfasasfasasfasfa");


  const renderCustomView = ({ item, index }) => {
    // console.log(item.title, "sdfssdd");
    const fontSize = scale(13)
    const color = 'black'
    return (
      // <ScrollView showsVerticalScrollIndicator={false}>

      <TouchableOpacity
        onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0 ? Alertpopup() : handlePress(item)}
        style={[styles.item, { minHeight: scale(80) }]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.renderLeftBox}>
            <Text style={styles.itemDate}>
              {moment(item.day).format("DD")}</Text>
            <Text style={styles.itemDay}>
              {moment(item.day).format("ddd")}</Text>
          </View>
          <View style={{ width: "70%" }}>

            <Text style={styles.itemTime}>{moment(item.starts_at).format("hh:mm A")}</Text>
            <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.itemDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>


      // </ScrollView>
    )
  }
  // alert(date.toISOString())
  const setDataBase = (date) => {
    // alert(date)
    let initialDate = date
    let aaa = new Date()
    const threeDaysBefore = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), -72, 0, 0); // Set it to today at 12:00 PM
    const appointmentDate = new Date(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate(), 6, 0, 0); // Set it to today at 12:00 PM
    const threeDaysMsg = `You have a ${creatingType} on ${moment(initialDate).format('D MMMM h:mm a')}, don't forget to add notes for your session!`
    const sameDateMsg = `You have a ${creatingType} today, don't forget to add notes for your session!`

    // console.log(moment(aaa).format("YYYY-MM-DD"), "fhshsdhshsdhsdhfsdhdfhdshsdhdfhsdfhsdfh", date);
    var date1 = new Date();
    let checkDate = moment(date1).format("YYYY-MM-DD")
    var date2 = moment(date).format("YYYY-MM-DD")
    // alert(date2 === checkDate)
    // // Calculate the time difference in milliseconds
    // var timeDiff = Math.abs(date1.getTime() - date2.getTime());

    // // Convert the time difference from milliseconds to days
    // const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // console.log('ewrwerwerwrwrwerwer', typeof daysDiff);
    // if (daysDiff > 3) {



    const data1 = database()
      .ref(`/notificationList/${userDetails.id}`)
      .push({
        title: creatingType,
        description: threeDaysMsg,
        // day: dateString,
        // type: creatingType,
        // starts_at: timeToSend,
        id: userDetails.id,
        // date:date.toISOString(),
        notificationTime: date2 === checkDate ? aaa.toString() : date.toString()
      })
      .then(() => console.log('Data set.'));
    const data2 = database()
      .ref(`/notificationList/${userDetails.id}`)
      .push({
        title: creatingType,
        description: sameDateMsg,
        // day: dateString,
        // type: creatingType,
        // starts_at: timeToSend,
        id: userDetails.id,
        // date:date.toISOString(),
        notificationTime: date2 === checkDate ? aaa.toString() : date.toString()
      })
      .then(() => console.log('Data set.'));
  }




  const handleCancel = () => {
    resetData()
    setModal2(false)
  }
  // console.log(modal1,"jghjhkjhkjhjkkj");
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <MainHeader menu />
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => {

          navigation.goBack();
        }} 
        style={{height:scale(30),width:scale(30)}}
        >
          <Image
            source={images.leftArrow}
            style={styles.menu}
            resizeMode='contain'
          />
        </TouchableOpacity>
        <Text style={styles.title}>Calendar</Text>

      </View>
      <Text style={styles.calenderheadline}>This is where you will enter your therapy appointments, as well as any meaningful events (such as getting a promotion, buying a house, having a meaningful conversation with a friend, etc.)</Text>
      {loader && <LoadingComponent />}

      {
        modal2 && (
          <Modal
            animationType='fade'
            transparent={true}
            visible={modal2}
            onRequestClose={() => {
              setModal2(!modal2);
            }}
          >
            {
              modal1 ?
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity style={{position:"absolute",right:10,top:10 }}
                    onPress={()=>{
                      setModal1(false)
                      setModal2(false)
                    }}
                    >

                  <Image 
                  source={images.crossGrey}
                  style={{ height: scale(15), width: scale(15)}}
                  resizeMode='stretch'
                  
                  />
                  </TouchableOpacity>
                    <Text onPress={() => handleClick("Event")} style={styles.modalText}>Add Event</Text>
                    <Text onPress={() => handleClick("Therapy Appointment")} style={styles.modalText}>Add Therapy Appointment</Text>

                  </View>
                </View>
                :
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {/* <TextInput
                      style={styles.inputTitle}
                      value={eventTitle}
                      onChangeText={(text) => setEventTitle(text)}
                      placeholder='Therapy Session'
                    /> */}
                    <Text style={styles.modalTitle}>{creatingType}</Text>
                    <TextInput
                      style={styles.inputText}
                      multiline={true}
                      value={eventDescription}
                      placeholderTextColor={colors.greyText}
                      onChangeText={(text) => setEventDescription(text)}
                      textAlignVertical='top'
                      placeholder='Description'
                    />
                    <View>
                      <Text onPress={() => setOpen(true)} style={styles.modalText}> Select-Time</Text>
                      <Text onPress={() => setOpen(true)} style={[styles.modalText, {
                        marginTop: scale(-15),
                        left: timeToSend ? verticalScale(10) : verticalScale(35),
                        color: colors.black
                      }]}>{timeToSend != "" ? moment(timeToSend).format("hh:mm A") : "--:--"}</Text>
                      {
                        open &&
                        <DatePicker
                          modal
                          open={open}
                          minimumDate={new Date()}
                          mode='time'
                          date={date}
                          onConfirm={(date) => {
                            setOpen(false)
                            setTimeToSend(date.toString())
                            // setDate(date)
                            console.log(date, "timeToSendtimeToSendtimeToSendtimeToSend");
                          }}
                          onCancel={() => {
                            setOpen(false)
                          }}
                        />
                      }
                    </View>
                    <View style={styles.btnBox}>
                      <CommonButtons title={btnName ? "Update" : "Add"} customStyle={{ height: scale(35), width: "30%" }}
                        onPress={() => !btnName ? handleAdd() : handleUpdate()} />
                      <CommonButtons title={"Cancel"} customStyle={{ height: scale(35), width: "30%" }}
                        onPress={() => handleCancel()}
                      />
                    </View>
                    {
                      btnName &&
                      <CommonButtons title={"Delete"} customStyle={{ height: scale(35), width: "30%", marginTop: scale(10) }}
                        onPress={() => handleDelete()}
                      />
                    }
                  </View>
                </View>
            }
          </Modal>
        )
      }

      <View style={styles.calenderBox}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Agenda
          testID={"agenda"}
          items={items}
          onDayPress={(item) => currentDate >= dateAfterWeek && userDetails?.subscription_status == 0 ? Alertpopup() : dayPress(item)}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          keyExtractor={item => item.id}
          renderList={(item, index) => renderCustomView(item.items, index)}
        /> */}
          <Calendar
            // Customize the appearance of the calendar
            style={{
              // borderWidth: 1,
              // borderColor: 'gray',
              // height: 200
            }}
            // disableArrowLeft={true}
            
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              selectedDayTextColor: '#ffffff',
            }}
            hideExtraDays={true}
            // minDate={currentDate}
            // Specify the current date
            current={currentDate}
            // Callback that gets called when the user selects a day
            onDayPress={
              (item) => userDetails.trial_end === true  && userDetails?.subscription_status == 0 ? Alertpopup() : dayPress(item)
              // (item) => {
              //   setDataBase(item.dateString)
              // }
            }
          />
          {CalendarDataList.length != 0 &&
          <FlatList
          data={items}
          renderItem={renderCustomView}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          />
        }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CalendarScreen

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    // marginRight: 10,
    // marginTop: 17,
    maxHeight: Platform.isPad ? verticalScale(100) : scale(100)
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  calenderBox: {
    height: Platform.isPad ? windowHeight - scale(250) : windowHeight - scale(300),
    width: windowWidth - scale(30),
    alignSelf: "center",
    // backgroundColor:"red"
  },
  headerBox: {
    height: scale(80),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  menu: {
    height: 18,
    width: 15,
    borderRadius: 20,
    overflow: "hidden",
    top:scale(5)

  },
  title: {
    fontSize: moderateScale(20) / fontScalingFactor,
    alignSelf: "center",
    // marginTop: scale(20),
    color: colors.signUpBtn,
    fontWeight: "700",
    // fontFamily: "PlusJakartaSans-Italic-VariableFont_wght",
    marginLeft: "30%"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  addingEventBox: {
    height: scale(200),
    width: "90%",
    // backgroundColor: "green",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    minHeight: scale(100),
    maxHeight: windowHeight / 1.5,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth - 50
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    color: colors.black,
    fontSize: moderateScale(18) / fontScalingFactor,
    padding: scale(10)
  },
  inputText: {
    height: "30%",
    color: colors.black,
    fontSize: scale(14) / fontScalingFactor,
    width: "90%",
    marginBottom: scale(10)
  },
  inputTitle: {

    height: "15%",
    color: colors.black,
    fontSize: scale(12) / fontScalingFactor,
    width: "90%",
    marginBottom: scale(5)
  },
  timeEntered: {
    height: scale(30),
    color: colors.greyText,
    fontSize: scale(12) / fontScalingFactor,
    width: scale(30), textAlign: 'left',
    marginBottom: scale(10),
    // backgroundColor: "red"
  },
  btnBox: { flexDirection: "row", justifyContent: "space-evenly", width: "100%" },
  renderLeftBox: { width: "25%", minHeight: scale(100), alignItems: "center" },
  itemDate: { color: colors.greyText, fontSize: moderateScale(24) / fontScalingFactor, marginTop: scale(10) },
  itemDay: { color: colors.greyText, fontSize: moderateScale(17) / fontScalingFactor, marginTop: scale(-4) },
  itemTime: {
    fontSize: (moderateScale(16)), color: colors.time, paddingLeft: scale(6),
    paddingTop: scale(10)
  },
  itemTitle: {
    fontSize: moderateScale(20), color: colors.black, paddingLeft: scale(6),
    paddingTop: scale(2)
  },
  itemDescription: {
    fontSize: moderateScale(13),
    color: colors.signUpBtn, paddingLeft: scale(6)
    , paddingTop: scale(2), fontWeight: "300"
  },
  calenderheadline: {
    // fontSize: moderateScale(15) / fontScalingFactor,
    // fontWeight: "400",
    marginHorizontal: 20,
    // color: colors.signUpBtn,
    top: -20,
    textAlign: "center",
    color: colors.black,
    fontSize: moderateScale(12) / fontScalingFactor,
    fontWeight: "300",
    paddingHorizontal: scale(10)
  },
  modalTitle: {
    fontSize: moderateScale(22) / fontScalingFactor,
    fontWeight: "500",
    color: colors.black,
    paddingVertical: scale(8)
  }

});

