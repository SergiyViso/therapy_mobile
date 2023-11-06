import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StatusBarComponent from '../src/components/StatusBarComponent'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { color } from 'react-native-reanimated'
import { colors } from '../src/components/Colors'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../src/components/CommonStyles'
import { images, imageBaseUrl } from '../src/components/Images'
import { useNavigation } from '@react-navigation/native'
import CommonButtons from '../src/components/CommonButtons'
import { useDispatch, useSelector } from 'react-redux'
import { isAccessToken } from '../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isUserLoggedOut } from '../redux/actions/mainAction'
import moment from 'moment'
//import Orientation from 'react-native-orientation-locker'


const CustomDrawer = (props) => {
  const userDetails = useSelector(state => state.auth.user)
  const userPromoCode = useSelector(state => state.auth.promocode)
  const dispatch = useDispatch()
  const DrawerNavigationList = [
    { id: 0, title: "Individual Therapy", image: images.drawerRightIcon },
    { id: 1, title: "Calendar", image: images.drawerRightIcon },
    { id: 2, title: "Monitor Your Progress", image: images.drawerRightIcon },
    { id: 3, title: "Goals2", image: images.drawerRightIcon },
    // { id: 4, title: "Symptom tracking", image: images.drawerRightIcon },
    { id: 5, title: "Homework", image: images.drawerRightIcon },
    // { id: 6, title: "Tracking", image: images.drawerRightIcon },
    { id: 7, title: "Subcription", image: images.drawerRightIcon },
    { id: 8, title: "Coupons", image: images.drawerRightIcon },
  ]
  const handleLogout = async () => {
    dispatch(isUserLoggedOut("yes"))

    await AsyncStorage.removeItem("deviceToken")
    dispatch(isAccessToken(""))

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
  const handleNavigation = (item) => {
    const currentDate = moment(new Date()).format('YYYY-MM-DD')
    // Assuming createdDate is a string containing the created date in ISO 8601 format, e.g. "2022-04-01T00:00:00.000Z"
    const createdDate = userDetails.created_at;
    const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000; // 2 weeks * 24 hours/day * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second
    // Convert the created date to milliseconds and add two weeks
    const twoWeeksLaterInMilliseconds = new Date(createdDate).getTime() + twoWeeksInMilliseconds;
    // Convert the milliseconds back to a Date object and format it as a string
    const twoWeeksLaterDate = new Date(twoWeeksLaterInMilliseconds).toISOString().substring(0, 10);
    if (userDetails.trial_end == true  && userDetails?.subscription_status == 0) {
      Alertpopup()
    } else {
      if (item.title == "Goals") {
        props.navigation.navigate("Goals")
      } else if (item.title == "Symptom tracking") {
        props.navigation.navigate("Symptomtracking")
      }
      else if (item.title == "Calendar") {
        props.navigation.navigate("Calendar")
      }
      else if (item.title == "Individual Therapy") {
        props.navigation.navigate("IndividualTherapy")
      }
      else if (item.title == "Monitor Your Progress") {
        props.navigation.navigate("GraphNavigations")
      }
      else if (item.title == "Homework") {
        props.navigation.navigate("MyHomeWorks")
        //Orientation.lockToLandscape()
      }
      else if (item.title == "Tracking") {
        props.navigation.navigate("TrackingRecords")
      }
      else if (item.title == "Subcription") {
        props.navigation.navigate("PlanScreen")
      }
      else if (item.title == "Coupons") {
        props.navigation.navigate("Coupons")
      }
    }
  }

  const renderNavigationList = ({ item ,index}) => {
    return (
      userPromoCode.length == 0 && index == DrawerNavigationList.length -1 ?
      <View></View>:
      <TouchableOpacity style={styles.renderViews} onPress={() => handleNavigation(item)}>
        <Text style={[styles.userName, { fontSize: moderateScale(12) / fontScalingFactor }]}>{item.title}</Text>
        <Image
          source={item.image}
          style={{ height: verticalScale(9), width: verticalScale(7) }}
          resizeMode='stretch'
        />
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <View style={{ flex: 1, backgroundColor: colors.signUpBtn }}>
        <View style={styles.topBox}>
          <Text style={styles.menuText}>Menu</Text>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>

            <Image
              source={images.cross}
              style={{ height: scale(16), width: scale(16) }}
              resizeMode='stretch'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userDetailBox}>
          <Image
            source={userDetails.image ? { uri: `${imageBaseUrl}` + userDetails.image } : images.dp}
            style={styles.profilePic}
            resizeMode='cover'
          />
          <Text style={styles.heyText}>Hi</Text>
          <Text numberOfLines={1} style={styles.userName2}>, {userDetails.name}</Text>
          <TouchableOpacity style={styles.menu} onPress={() => props.navigation.navigate("UserProfile")}>
            <Text style={{ color: colors.signUpBtn,fontSize:moderateScale(11)/fontScalingFactor }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={DrawerNavigationList}
            renderItem={renderNavigationList}
            keyExtractor={item => item.id}
          />
          <CommonButtons title='Logout' onPress={() => handleLogout()} customStyle={styles.logoutButton} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  topBox: {
    height: verticalScale(30),
    width: "100%",
    marginTop: scale(40),
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20)
  },
  menuText: {
    color: colors.white,
    fontSize: moderateScale(20) / fontScalingFactor,
    fontWeight: "500"
  },
  userDetailBox: {
    flexDirection: "row",
    height: scale(50),
    width: "100%",
    alignItems: "center",
    paddingLeft: scale(20),
    marginVertical: scale(15),
    overflow: 'hidden'
  },
  profilePic: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(20),
    overflow: "hidden"

  },
  menuPic: {
    height: scale(30),
    width: scale(30),

  },
  menu: {
    position: "absolute",
    right: scale(20),
    width: "35%",
    backgroundColor: colors.white,
    height: scale(30),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center"
  },
  heyText:
  {
    fontSize: moderateScale(13) / fontScalingFactor,
    color: colors.white, fontWeight: "600", left: 6
  },
  userName: {
    fontSize: moderateScale(13) / fontScalingFactor,
    color: colors.white, left: 6
  },
  userName2: {
    fontSize: moderateScale(13) / fontScalingFactor,
    color: colors.white, left: 6, width: "28%"
  },
  renderViews: {
    height: scale(30),
    width: "100%",
    // backgroundColor: "grey",
    marginVertical: scale(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(20)
  },
  logoutButton: {
    marginTop: scale(20),
    height: scale(35),
    borderRadius: scale(20),
    alignSelf: "center",
    width: "60%"
  }

})