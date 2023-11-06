import { Image, Keyboard, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from '../src/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../src/screens/authScreens/Welcome';
import LoginScreen from '../src/screens/authScreens/LoginScreen';
import SignUp from '../src/screens/authScreens/SignUp';
import MakingNotes from '../src/screens/authScreens/MakingNotes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { colors } from '../src/components/Colors';
import Dashboard from '../src/screens/mainScreen/Dashboard';
import Calendar from '../src/screens/mainScreen/Calendar';
import NotificationScreen from '../src/screens/mainScreen/NotificationScreen';
import { useSelector } from 'react-redux';
import { PaddingVertical } from '../src/components/Styles';
import { fontScalingFactor, windowWidth } from '../src/components/CommonStyles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { images } from '../src/components/Images';
import IndividualTherapy from '../src/screens/mainScreen/IndividualTherapy';
import NewNotes from '../src/screens/mainScreen/NewNotes';
import CustomDrawer from './CustomDrawer';
import UserProfile from '../src/screens/mainScreen/UserProfile';
import Goals from '../src/screens/mainScreen/Goals';
import Symptomtracking from '../src/screens/mainScreen/Symptomtracking';
import ForgotPasswordScreen from '../src/screens/authScreens/ForgotPasswordScreen';
import Challenges from '../src/screens/mainScreen/Challenges';
import AcceptChallenge from '../src/screens/mainScreen/AcceptChallenge';
import ChangePasswordScreen from '../src/screens/mainScreen/ChangePasswordScreen';
import Feather from 'react-native-vector-icons/Feather'
import AddHomeWork from '../src/screens/mainScreen/AddHomeWork';
import MyHomeWorks from '../src/screens/mainScreen/MyHomeWorks';
import AgendaCalender from '../src/screens/mainScreen/AgendaCalender';
import Tracking from '../src/screens/mainScreen/Tracking';
import TrackingRecords from '../src/screens/mainScreen/TrackingRecords';
import CardScreen from '../src/screens/mainScreen/subscription/CardScreen';
import PlanScreen from '../src/screens/mainScreen/subscription/PlanScreen';
import NotificationTest from '../src/screens/mainScreen/notification/NotificationTest';
import SymptomsGraph from '../src/screens/mainScreen/trakingGraphs/SymptomsGraph';
import GraphNavigations from '../src/screens/mainScreen/trakingGraphs/GraphNavigations';
import CancelSubscription from '../src/screens/mainScreen/subscription/CancelSubscription';
import TrackWeeklyRating from '../src/screens/mainScreen/trakingGraphs/TrackWeeklyRating';
import GoalsGraph from '../src/screens/mainScreen/trakingGraphs/GoalsGraph';
import Goals2 from '../src/screens/mainScreen/Goals2';
import Coupons from '../src/screens/mainScreen/Coupons';
import RedeemCoupon from '../src/screens/mainScreen/RedeemCoupon';
import HomeWorkSearch from '../src/screens/mainScreen/HomeWorkSearch';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const token = useSelector(state => state.auth.accessToken)
  return (
    <NavigationContainer>
      {
        token ?
          <DashboardStack /> :
          <AuthStackk />
      }
    </NavigationContainer>
  )
}

function HomeStack() {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  // console.log(isRemember);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true, // use this props to hide bottom tabs when keyboard shown
      }}
      screenOptions={{
        tabBarStyle: {
          position: 'absolute', borderRadius: 30, 
          backgroundColor: colors.signUpBtn,
          height: verticalScale(55), paddingHorizontal: scale(5), 
          width: windowWidth - scale(50), marginLeft: scale(25),
          bottom: !keyboardStatus ? verticalScale(20) : 0,
        },
        tabBarShowLabel: false,
        keyboardHidesTabBar: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}

        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.tabStyle}>
              {/* <Feather name="home" size={24} color="black" /> */}
              <Image
                source={images.home}
                style={{ height: verticalScale(20),
                   width: verticalScale(18),
                  marginTop: Platform.OS == 'android' ? 
                  verticalScale(10) : scale(-15)
                 }}
                resizeMode="contain"
              />
              <PaddingVertical style={verticalScale(2)} />
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: verticalScale(-15),
                left: scale(-4),
                width: scale(40),
                justifyContent: "center",
                top:Platform.OS == 'android' && verticalScale(-5)
              }}>
                <View style={{
                  height: verticalScale(6),
                   width: verticalScale(6),
                  bottom: Platform.OS == 'android' ?
                   verticalScale(-2) :
                  verticalScale(2),
                  backgroundColor: focused ? colors.buttonColor :
                   colors.white,
                   borderRadius: scale(5),
                   marginHorizontal: scale(5),
                }}></View>
                <Text style={[{
                  color: colors.white, 
                  fontSize: moderateScale(11)/fontScalingFactor,
                  marginTop: Platform.OS == 'android' ? 
                  verticalScale(1) : verticalScale(-2)
                }]}>Home</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.tabStyle}>
              {/* <AntDesign name="carryout" size={24} color="black" /> */}
              <Image
                source={images.calender}
                style={{ height: verticalScale(21),
                  width: verticalScale(19), 
                  marginTop: Platform.OS == 'android' ?
                   verticalScale(10) : scale(-15) }}
                resizeMode="contain"
              />
              <PaddingVertical style={2} />
              <View style={{ flexDirection: "row",
               alignItems: "center", marginTop: verticalScale(-15),
                left: scale(-4),
                top:Platform.OS == 'android' && verticalScale(-5) }}>
                <View style={{
                  height: verticalScale(6),
                   width: verticalScale(6),
                  bottom: Platform.OS == 'android' ?
                  verticalScale(0) :
                  verticalScale(2),
                  backgroundColor: focused ? colors.buttonColor :
                   colors.white, borderRadius: scale(5),
                    marginHorizontal: scale(5),
                }}></View>
                <Text style={[{ color: colors.white,
                 fontSize: moderateScale(12)/fontScalingFactor,
                   marginTop: Platform.OS == 'android' ? verticalScale(-1) : verticalScale(-2) }]}
                   >Calendar</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ focused, size }) => (
            <View style={styles.tabStyle}>
              {/* <Entypo name="time-slot" size={24} color="black" /> */}
              <Image
                source={images.bell}
                style={{height: verticalScale(18),
                   width: verticalScale(16), 
                  marginTop: Platform.OS == 'android' ?
                   verticalScale(8) : scale(-15) }}
                resizeMode="contain"
              />
              <PaddingVertical style={2} />
              <View style={{ flexDirection: "row", 
              alignItems: "center",
              marginTop: verticalScale(-13), 
              left: scale(-4),
              top:Platform.OS == 'android' && verticalScale(-2) }}>
                <View style={{
                  height: verticalScale(6), 
                  width: verticalScale(6),
                  bottom: Platform.OS == 'android' ? verticalScale(2) :
                  verticalScale(2),
                  backgroundColor: focused ? colors.buttonColor :
                   colors.white, borderRadius: scale(5),
                    marginHorizontal: scale(5),
                }}></View>
                <Text style={[{ color: colors.white,
                   fontSize: moderateScale(11)/fontScalingFactor,
                   marginTop: Platform.OS == 'android' ? verticalScale(-5)
                    :
                    verticalScale(-2) }]}>Notification</Text>
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const DashboardStack = () => {
  const MainStack = createStackNavigator()
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"DrawerStack"}
    >
      {/* used NotificationTest for testing  initialRouteName == DrawerStack */}
      <MainStack.Screen name='NotificationTest' component={NotificationTest} />
      <MainStack.Screen name='DrawerStack' component={DrawerStack} />
      <MainStack.Screen name='IndividualTherapy' component={IndividualTherapy} />
      <MainStack.Screen name='NewNotes' component={NewNotes} />
      <MainStack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <MainStack.Screen name="Challenges" component={Challenges} />
      <MainStack.Screen name="AcceptChallenge" component={AcceptChallenge} />
      <MainStack.Screen name="SymptomsGraph" component={SymptomsGraph} />
      <MainStack.Screen name="AddHomeWork" component={AddHomeWork} />
      <MainStack.Screen name="MyHomeWorks" component={MyHomeWorks} />
      <MainStack.Screen name="AgendaCalender" component={AgendaCalender} />
      <MainStack.Screen name="TrackingRecords" component={TrackingRecords} />
      <MainStack.Screen name="Tracking" component={Tracking} />
      <MainStack.Screen name="CardScreen" component={CardScreen} />
      <MainStack.Screen name="GraphNavigations" component={GraphNavigations} />
      <MainStack.Screen name="CancelSubscription" component={CancelSubscription} />
      <MainStack.Screen name="TrackWeeklyRating" component={TrackWeeklyRating} />
      <MainStack.Screen name="GoalsGraph" component={GoalsGraph} />
      <MainStack.Screen name="Goals2" component={Goals2} />
      <MainStack.Screen name="Coupons" component={Coupons} />
      <MainStack.Screen name="RedeemCoupon" component={RedeemCoupon} />
      <MainStack.Screen name="HomeWorkSearch" component={HomeWorkSearch} />
     
    </MainStack.Navigator>
  )
}
const AuthStackk = () => {
  const userAction = useSelector(state=>state.main.userAction)
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userAction?"Welcome":"SplashScreen"}
    >
      <AuthStack.Screen name='SplashScreen' component={SplashScreen} />
      <AuthStack.Screen name='Welcome' component={Welcome} />
      <AuthStack.Screen name='LoginScreen' component={LoginScreen} />
      <AuthStack.Screen name='SignUp' component={SignUp} />
      <AuthStack.Screen name='MakingNotes' component={MakingNotes} />
      <AuthStack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  )
}
const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeStack'
      drawerContent={props => <CustomDrawer {...props} />}

      screenOptions={{
        drawerActiveBackgroundColor: '#0b1c32',
        drawerInactiveTintColor: '#f1f1f1',
        headerShown: false,
        drawerPosition: "right",
        drawerLabelStyle: {
          marginLeft: 5,
          fontSize: 15,
        },
        drawerStyle:{
          width:windowWidth* 0.7
        }
      }}>
      <Drawer.Screen name='HomeStack' component={HomeStack} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="IndividualTherapy" component={IndividualTherapy} />
      <Drawer.Screen name="Calendar" component={Calendar} />
      <Drawer.Screen name="UserProfile" component={UserProfile} />
      <Drawer.Screen name="Goals" component={Goals} />
      <Drawer.Screen name="Symptomtracking" component={Symptomtracking} />
     
      <Drawer.Screen name="PlanScreen" component={PlanScreen} />
      


    </Drawer.Navigator>
  )
}

export default AppNavigation

const styles = StyleSheet.create({
  tabStyle: {
    alignItems: 'center', justifyContent: "center",
    marginTop: Platform.OS == 'ios' ? scale(18) : 0,
    width: scale(80)
  },
  customStyle: {
    alignItems: 'center', justifyContent: 'center',
  },
  imageStyle1: { width: 20, height: 20, tintColor: colors.black },
  imageStyle: { width: 20, height: 20, tintColor: colors.black }
})