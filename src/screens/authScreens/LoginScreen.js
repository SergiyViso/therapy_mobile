import { Image, ImageBackground, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import { images } from '../../components/Images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import CommonInputs from '../../components/CommonInputs'
import StatusBarComponent from '../../components/StatusBarComponent'
import TextInputComponent from '../../components/TextInputComponent'
import { PaddingVertical } from '../../components/Styles'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import CommonButtons from '../../components/CommonButtons'
import LoadingComponent from '../../components/LoadingComponent'
import { loginApi } from '../../../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isAccessToken } from '../../../redux/actions/authAction'
import { useIsFocused } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

const LoginScreen = (props) => {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [fcmToken, setFcmToken] = useState("")
  const [isRemember, setIsRemember] = useState(false)
  const [loader, setLoader] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const dispatch = useDispatch()
  const IsFocused = useIsFocused()
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
  useEffect(() => {
    checkToken();
    getRememberedData()
    setUserName("")
    setPassword("")
  }, [IsFocused])

  const getRememberedData = async () => {

    let email = await AsyncStorage.getItem("email")
    console.log(email, "email we have");
    if (email != null) {
      setUserName(email)
      setIsRemember(true)
    }
    let password = await AsyncStorage.getItem("password")
    console.log(password, "password we have");
    if (password != null) {
      setPassword(password)
    }
  }


  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setFcmToken(fcmToken)
      console.log("fcmTokenfcmTokenfcmTokenfcmTokenfcmToken", fcmToken);
    }
  }
  const ONlogincell = async () => {
    var login = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username.trim() == "") {
      errorToast('Please enter your Email')
    } else if (password.trim() == "") {
      errorToast('Please enter your password')
    } else if (password.length < 6) {
      errorToast('Login credentials are invalid')
    } else {
      setLoader(true)
      // setModal(true)
      var data = new FormData();
      data.append("email", username.trim());
      data.append("password", password.trim());
      data.append("fcm_token", fcmToken);
      dispatch(loginApi(data)).then(async (res) => {
        setLoader(false)
        console.log(res);
        if (res.success == true) {
          setLoader(false)
          await AsyncStorage.setItem("email", isRemember ? username : "")
          await AsyncStorage.setItem("password", isRemember ? password : "")
          await AsyncStorage.setItem("deviceToken", res.token)
          setUserName("")
          setPassword("")
          successToast('Login Successfully')
        } else {
          setLoader(false)
          errorToast(res.message)
        }
      }).catch(Error => {
        setLoader(false)
        errorToast("Network request failed")
      })
    }
  }
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <StatusBarComponent />
      <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.iconBackground}>
        <Image
          source={images.backIcon}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      {loader && <LoadingComponent />}
      <ScrollView>


        <View style={styles.contentBox}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.login}>Log In</Text>
          <Text style={styles.text}>Login your account here</Text>
          {/* <CommonInputs /> */}
          <TextInputComponent value={username} icon={images.Profile} placeholder="Enter Your Email" handleChangeText={(t) => setUserName(t)} />
          <PaddingVertical number={10} />
          <TextInputComponent value={password} icon={images.Lock} placeholder="Password" secureTextEntry={true}
            handleChangeText={(t) => setPassword(t.trim())} closeEye />
          <View style={styles.rowBox}>
            <View style={styles.leftBox}>
              <TouchableOpacity onPress={() => setIsRemember(!isRemember)}>
                <Image
                  source={isRemember ? images.tickBox : images.squareBox}
                  style={styles.tickIcon}
                />
              </TouchableOpacity>
              <Text style={{ paddingLeft: scale(5), color: colors.black }}>Remember me</Text>
            </View>
            <View style={styles.rightBox}>
              <Text onPress={() => props.navigation.navigate("ForgotPasswordScreen")} style={{ color: colors.black, alignSelf: "flex-end" }}>Forgot Password?</Text>
            </View>
          </View>
          <CommonButtons customStyle={styles.loginButton} title='Login'
            onPress={() => ONlogincell()}
          //  onPress={()=>dispatch(isAccessToken("yes"))}
          />

        </View>
        {
          !keyboardStatus &&
          <View style={styles.bottomView}>
            <ImageBackground
              source={images.bottomHillBackground}
              style={styles.bottomImage}
              resizeMode='stretch'
            >
              <Text style={styles.botomText}>New member?<Text onPress={() => props.navigation.navigate("SignUp")} style={styles.botomText1}> Sign up</Text></Text>
            </ImageBackground>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  iconBackground: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    backgroundColor: colors.signUpBtn,
    justifyContent: "center",
    alignItems: "center",
    margin: scale(15),
    marginTop: scale(25),

  },
  backIcon: {
    height: scale(25),
    width: scale(25),
  },
  tickIcon: {
    height: scale(18),
    width: scale(18),
  },
  contentBox: {
    height: windowHeight / 1.5,
    width: windowWidth - 80,
    alignSelf: "center",
    // backgroundColor:"red",
    zIndex: 67
  },
  welcome: {
    fontSize: moderateScale(30) / fontScalingFactor,
    fontWeight: "700",
    marginTop: scale(20),
    color: colors.black,
    // fontFamily: "Poppins-Regular"

  },
  login: {
    fontSize: moderateScale(22) / fontScalingFactor,
    fontWeight: "600",
    marginTop: scale(20),
    color: colors.black,
    // fontFamily: "Poppins-Regular"
  },
  text: {
    fontSize: moderateScale(13) / fontScalingFactor,
    fontWeight: "400",
    marginBottom: scale(20),
    color: colors.greyText,
    // fontFamily: "Poppins-Regular"
  },
  rowBox: {
    height: verticalScale(30),
    width: "100%",
    // backgroundColor:"lightgrey",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(10),
    flexDirection: "row"
  },
  leftBox: {
    height: "100%",
    width: "45%",
    alignItems: "center",
    flexDirection: "row"
  },
  rightBox: {
    height: "100%",
    width: "45%",
    // backgroundColor:"grey",
    justifyContent: "center"
    // alignItems:"center",
    // flexDirection:"row"
  },
  loginButton: {
    width: "100%",
    marginTop: verticalScale(20),
    zIndex: 999
  },
  bottomView: {
    height: windowHeight / 3,
    width: windowWidth,
    // position:"absolute",
    marginTop: scale(-40),
    zIndex: -1

  },
  bottomImage: {
    height: "100%",
    width: "100%"
  },
  botomText: {
    color: colors.black,
    fontSize: moderateScale(15) / fontScalingFactor,
    bottom: moderateScale(40) / fontScalingFactor,
    position: "absolute",
    alignSelf: "center",
  },
  botomText1: {
    color: colors.buttonColor,
    fontSize: moderateScale(15) / fontScalingFactor,
    bottom: moderateScale(40) / fontScalingFactor,
    position: "absolute",
    alignSelf: "center"
  }

})