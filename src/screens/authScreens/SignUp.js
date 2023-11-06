import {
  Image, ImageBackground, Keyboard, KeyboardAvoidingView,
  Modal, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet,
  Text, TouchableOpacity, View, Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
import StatusBarComponent from '../../components/StatusBarComponent'
import { images } from '../../components/Images'
import TextInputComponent from '../../components/TextInputComponent'
import { PaddingVertical } from '../../components/Styles'
import CommonButtons from '../../components/CommonButtons'
import { colors } from '../../components/Colors'
import Toast from 'react-native-toast-message';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import { useDispatch } from 'react-redux'
import { getRegistered } from '../../../redux/actions/authAction'
import LoadingComponent from '../../components/LoadingComponent'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CommonModal from '../../components/CommonModal'
import { useIsFocused } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

const SignUp = (props) => {
  const [userName, setUserName] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fcmToken, setFcmToken] = useState("")
  const [loader, setLoader] = useState(false)
  const [confirmPassword, settConfirmPassword] = useState("")
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const [saveImage, setSaveImage] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const IsFocused = useIsFocused()
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
  }, [IsFocused])

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setFcmToken(fcmToken)
      // console.log("fcmToken", fcmToken);
    }
  }
  const handleMobile = (t) => {
    setMobile(t.replace(/[^0-9 ]/g, ''))
  }
  const resisterHandler = () => {
    var login = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const reg = /^[0-9\b]+$/;
    if (userName.trim() == '') {
      errorToast('Please enter your Name')
    }
    else if (email.trim() == "") {
      errorToast('Please enter your email')
    } else if (login.test(email.trim()) == false) {
      errorToast('Please enter valid email')
    } else if (password.trim() == "") {
      errorToast('Please enter your password')
    } else if (password.length < 6 || password.length > 13) {
      errorToast('Password must be 6-13 characters.')
    }
    else if (confirmPassword.trim() == "") {
      errorToast('Please enter confirm password')
    } else if (password !== confirmPassword) {
      errorToast('Password and Confirm password does not match')
    }

    else {
      setLoader(true)
      var formdata = new FormData();
      formdata.append("name", userName);
      formdata.append("email", email);
      formdata.append("password", password);
      // formdata.append("phone_number", mobile);
      formdata.append("password_confirmation", confirmPassword);
      // formdata.append("fcm_token", fcmToken);
      if (saveImage) {

        formdata.append("image", { uri: saveImage?.uri, name: saveImage?.fileName, type: saveImage?.type });
      }
      dispatch(getRegistered(formdata)).then(async (res) => {
        console.log(res, "signup response==");
        if (res.success == true) {
          setLoader(false)
          setTimeout(()=>{
          successToast("Signup Successfully")
          },1000)
           setModalVisible(true)
         
        }
        else if (res.message) {
          setLoader(false)
          setTimeout(()=>{

            errorToast(res.message)
          },1000)
        }
      }).catch(Error => {
        setLoader(false)
        console.log(Error,"hjhjhjhjhjh");
      })
    }
  };

  async function Contactshow() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:
          "App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  }
  useEffect(() => {
    if (Platform.OS == 'android') {
      setTimeout(() => {
        Contactshow()
      }, 500)
    }
  }, []);
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
      {
        modal && <CommonModal isVisible={modal} onChange={(value) => setModal(value)}
          onSelectImage={(image) => setSaveImage(image)} />
      }
      {/* <View style={styles.centerBox}> */}
      {/* <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.centerBox}
    > */}
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ width: windowWidth - scale(70), alignSelf: "center" }}>
          <Text style={styles.signUpText}>Sign up</Text>
          <Text style={styles.upperText}>Create an account here</Text>
          <TouchableOpacity onPress={() => setModal(true)} style={styles.dpCircle}>
            <Image
              source={saveImage ? saveImage : images.dp}
              style={styles.dp}
              resizeMode='contain'
            />
            <Image
              source={images.cameraBackground}
              style={styles.cameraBackground}
              resizeMode='stretch'
            />
            <Image
              source={images.camera}
              style={styles.camera2}
              resizeMode='stretch'
            />

          </TouchableOpacity>
          <TextInputComponent value={userName} icon={images.Profile} placeholder="Name" handleChangeText={(t) => setUserName(t)} />
          {/* <TextInputComponent value={mobile}keyboardType='numeric' icon={images.mobile} placeholder="Mobile Number"
          handleChangeText={(t) => handleMobile(t)}
          maxLength={15}
        /> */}
          <TextInputComponent value={email} icon={images.email} placeholder="Email address"
            handleChangeText={(t) => setEmail(t)}

          />
          <TextInputComponent value={password} icon={images.Lock} placeholder="Password"
            handleChangeText={(t) => setPassword(t.trim())}
            secureTextEntry={true}
            closeEye
          />
          <TextInputComponent value={confirmPassword} icon={images.Lock}
            placeholder="Confirm Password" handleChangeText={(t) => settConfirmPassword(t)}
            closeEye
            secureTextEntry={true} />
          <CommonButtons customStyle={styles.loginButton} title='Sign Up'
            onPress={() => resisterHandler()}
          />
        </View>
        {
          keyboardStatus &&
          <View style={{ height: 50 }}></View>
        }
        {/* </View> */}
        {/* {
          !keyboardStatus && */}
        <View style={styles.bottomView}>
          <ImageBackground
            source={images.bottomHillBackground}
            style={styles.bottomImage}
            resizeMode='stretch'
          >
            <Text style={styles.lowerText}>By signing up you agree with our Terms of Use</Text>
            {/* <Text style={styles.lowerText}>By signing up you agree with our Terms of Use</Text> */}
            <Text style={styles.botomText}>Already have an account?<Text
              onPress={() => props.navigation.navigate("LoginScreen")}
              style={styles.botomText1}> Sign In</Text></Text>
          </ImageBackground>
        </View>
        {/* } */}
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      {/* ////////////////pop-up for 14days free trials////////////////////////////////// */}

      <View style={styles.centeredView1}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <Text style={[styles.modalText1, { fontWeight: "bold", fontSize: verticalScale(18), color: colors.signUpBtn }]}>Congratulations!</Text>

              <Image source={images.congrats} style={styles.congrats} />
              <Text style={[styles.modalText1,{marginTop:20}]}>please enjoy your free 14 days free trial!</Text>

              <TouchableOpacity
              style={[styles.button1, styles.buttonClose1]}
              onPress={() => {setModalVisible(!modalVisible), props.navigation.navigate("LoginScreen")}}>
              <Text style={styles.textStyle1}>Continue To Login</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>



    </SafeAreaView>
  )
}

export default SignUp

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
  signUpText: {
    fontSize: moderateScale(23) / fontScalingFactor,
    fontWeight: "600",
    marginTop: scale(20),
    color: colors.black,
    fontFamily: "Poppins-Regular"
  },
  centerBox: {
    // paddingHorizontal:scale(70),
    alignSelf: "center",
    // backgroundColor:"lightgrey",
    width: windowWidth,
    // height: windowHeight / 1.2,
    flex: 1,
    zIndex: 90

  },
  upperText: {
    fontSize: moderateScale(13) / fontScalingFactor,
    color: colors.greyText
  },
  lowerText: {
    alignSelf: "center", color: colors.black,
    marginTop: verticalScale(20),
    fontSize: moderateScale(13) / fontScalingFactor,
    position: "absolute",
    top: scale(10)
  },
  bottomView: {
    height: windowHeight / 3,
    width: windowWidth,
    // position: "absolute",
    // bottom: 30,


  },
  loginButton: {
    width: "100%",
    marginTop: verticalScale(30),
    zIndex: 999
  },
  bottomImage: {
    height: "100%",
    width: "100%"
  },
  botomText: {
    color: colors.black,
    fontSize: moderateScale(15) / fontScalingFactor,
    bottom: moderateScale(30) / fontScalingFactor,
    position: "absolute",
    alignSelf: "center"
  },
  botomText1: {
    color: colors.buttonColor,
    fontSize: moderateScale(15) / fontScalingFactor,
    bottom: moderateScale(40) / fontScalingFactor,
    position: "absolute",
    alignSelf: "center"
  },
  dp: {
    height: scale(78),
    width: scale(78),


  },
  cameraBackground: {
    zIndex: 8,
    height: scale(18),
    width: scale(80),
    position: "absolute",
    bottom: 0
  },
  dpCircle: {
    // height: scale(80),
    // width: scale(80),
    // alignSelf: "center",
    // borderWidth: 2,
    // borderColor: colors.buttonColor,
    // borderRadius: scale(40),
    // marginTop: scale(15),
    // overflow: "hidden",
    // marginTop: scale(15)


    height: scale(80),
    width: scale(80),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.buttonColor,
    borderRadius: scale(40),
    marginTop: scale(15),
    overflow: "hidden",
},
  text1: {
    fontSize: moderateScale(12) / fontScalingFactor,
    alignSelf: "center",
    marginTop: scale(8),
    color: colors.black,
    fontWeight: "400",
    fontFamily: "Poppins-Regular"
  },
  camera: {
    height: scale(17),
    width: scale(17),
  },
  camera2: {
    height: scale(17),
    width: scale(17),
    position: "absolute",
    bottom: scale(3),
    zIndex: 99,
    alignSelf: "center"
  },
  cancelBtn: {
    height: scale(35),
    width: "80%",
    position: "absolute",
    bottom: scale(20)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#00000066"
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: scale(10),
    alignItems: "center",
    shadowColor: colors.buttonColor,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: scale(160),
    width: windowWidth / 1.5,
    justifyContent: "center"
  },
  modalText: {
    textAlign: "center",
    color: colors.white,
    fontSize: moderateScale(8) / fontScalingFactor
  },
  crossImage: {

    position: "absolute",
    right: 5,
    top: 5
  },
  cross: {
    height: scale(20),
    width: scale(20),
  },
  modalInnerBox: {
    height: "30%",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: scale(40)
  },
  innerBox1: {
    height: "90%",
    width: "40%",
    backgroundColor: colors.signUpBtn,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(10)
  },
  innerBox2: {
    height: "90%",
    width: "40%",
    backgroundColor: colors.signUpBtn,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(10)
  },
  ////////////////Modalpop-up styles//////////


  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button1: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  buttonOpen1: {
    backgroundColor: '#F194FF',
  },
  buttonClose1: {
    backgroundColor: colors.buttonColor,
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    color: colors.black
  },

  congrats: {
    height: scale(50),
    width: scale(50)
  }




})