import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commonStyles, errorToast, windowHeight, windowWidth } from '../components/CommonStyles'
import { scale } from 'react-native-size-matters'
import { colors } from '../components/Colors'
import { images } from '../components/Images'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserProfile, isAccessToken } from '../../redux/actions/authAction'
import Toast from 'react-native-toast-message'
// import {images} from '../assets/images'

const SplashScreen = () => {
  // const token = useSelector(state=>state.auth.accessToken)
  // console.log(token);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      getUserStatus()
    }, 500)
  }, [])
  const getUserStatus = async()=>{
    const value = await AsyncStorage.getItem("userStatus")
    if (value !== null && value !== "") {
      getDeviceToken()
    }
    else{
      navigation.navigate("MakingNotes")
    }
  }
  const getDeviceToken = async () => {

    const value = await AsyncStorage.getItem("deviceToken")
    if (value !== null && value !== "") {
      await dispatch(getUserProfile(value)).then(res => {
        // console.log("profile api responsee",JSON.stringify(res));
        if (res) {
          dispatch(isAccessToken(value))
        } else {
         navigation.replace("Welcome")
        }
      }).catch((e) => {
        errorToast(e.message)
      })

      // navigation.navigate("Drawer")
    } else {
      navigation.replace("Welcome")
    }
  }
  return (
    <View style={commonStyles.mainContainer}>
      <View style={styles.centeredView}>
        <Image
          source={images.logo}
          style={styles.logoStyle}
          resizeMode='stretch'
        />
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  centeredView: {
    height: scale(80),
    marginTop: windowHeight / 2.3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  logoStyle: {
    height: scale(53),
    width: scale(160),
    alignSelf: "center"
  }
})