import { Image, ImageBackground, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import  CommonButtons  from '../../components/CommonButtons'
import LoadingComponent from '../../components/LoadingComponent'
import { forgetPassword, loginApi } from '../../../redux/actions/authAction'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const dispatch = useDispatch()
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
  const forgetPress = ()=>{
    var login = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email.trim() == "") {
        errorToast('Please enter your Email')
        
    } else if (login.test(email.trim()) == false) {
      errorToast('Please enter valid Email')
       
    }else{
        // alert('pp')
        setLoader(true)
        var formdata = new FormData();
           formdata.append("email", email);
        dispatch(forgetPassword(formdata)).then(async res=>{
        console.log(res,"asfcxvxvsdvsdvsdvsdvvdsvsdvsdvsdvsdvsdvsdvsd");
        if (res.status == true) {
           successToast(res.message)
           props.navigation.goBack()
        }
        else{
            // setModalVisible(true)  
            successToast(res.message)
        }
        setLoader(false)

       }).catch(e=>{
        console.log(e,"forget error");
        setLoader(false)
       
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
      <View style={styles.contentBox}>
        <Text style={styles.welcome}>Forgot Your Password?</Text>
        <Text style={styles.text}>Confirm Your email and we’ll  send the instructions</Text>
        {/* <CommonInputs /> */}
        <TextInputComponent value={email} icon={images.email} placeholder="Email address" handleChangeText={(t) => setEmail(t)} />
        <PaddingVertical number={10} />
        <CommonButtons customStyle={styles.loginButton} title='Reset Password' onPress={()=>forgetPress()}/>
      </View>
      {
        !keyboardStatus &&
      <View style={styles.bottomView}>
        <ImageBackground
        source={images.bottomHillBackground}
        style={styles.bottomImage}
        resizeMode='stretch'
        >
        <Text style={styles.botomText}>New member?<Text onPress={()=>props.navigation.navigate("SignUp")} style={styles.botomText1}> Sign up</Text></Text>
        </ImageBackground>
      </View>
        }
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen

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
    alignSelf: "center"
  },
  welcome: {
    fontSize: moderateScale(25)/fontScalingFactor,
    fontWeight: "700",
    marginTop: scale(20),
    color: colors.black,
    // fontFamily: "Poppins-Regular",
    width:"70%",
    marginBottom: scale(10),

  },
  login: {
    fontSize: moderateScale(25)/fontScalingFactor,
    fontWeight: "600",
    marginTop: scale(20),
    color: colors.black,
    // fontFamily: "Poppins-Regular"
  },
  text: {
    fontSize: moderateScale(15)/fontScalingFactor,
    fontWeight: "400",
    marginBottom: scale(20),
    color: colors.greyText,
    // fontFamily: "Poppins-Regular",
    width:"80%"
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
  loginButton:{
    width:"100%",
    marginTop:verticalScale(20)
  },
  bottomView:{
    height:windowHeight/3,
    width:windowWidth,
    position:"absolute",
    bottom:0,
    
  },
  bottomImage:{
    height:"100%",
    width:"100%"
  },
  botomText:{
    color:colors.black,
    fontSize:moderateScale(18)/fontScalingFactor,
    bottom:moderateScale(40)/fontScalingFactor,
    position:"absolute",
    alignSelf:"center"
  },
  botomText1:{
    color:colors.buttonColor,
    fontSize:moderateScale(18)/fontScalingFactor,
    bottom:moderateScale(40)/fontScalingFactor,
    position:"absolute",
    alignSelf:"center"
  }

})