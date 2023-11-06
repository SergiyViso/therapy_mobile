import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontScalingFactor, windowWidth } from './CommonStyles'
import { images } from './Images'
import { colors } from './Colors'

const CommonInputs = ({ placeHolder, value, onChange = (t) => { }, leftIcon, rightIcon }) => {
  return (
    <View style={styles.inputBox}>
      <Image
        source={images.Profile}
        style={styles.leftIconStyle}
        resizeMode='stretch'
      />
      <View style={styles.verticleLine}></View>
      <TextInput
        value={value}
        style={{color:colors.black}}
      />
    </View>
  )
}
 export const ProfileInputs = ({ placeHolder, value,title, onChange = (t) => { },secureText}) => {
  return (
    <View style={styles.ProfileInputBox}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeHolder?placeHolder:""}
        placeholderTextColor={colors.greyText}
        onChangeText={(t)=>{
          onChange(t)
        }}
        secureTextEntry={secureText?secureText:false}
      />
    </View>
  )
}

export default CommonInputs

const styles = StyleSheet.create({
  inputBox: {
    height: verticalScale(45),
    width: windowWidth - 80,
    alignSelf: "center",
    backgroundColor: "lightgrey",
    marginVertical: verticalScale(10),
    flexDirection: "row",
    alignItems: "center"
  },
  leftIconStyle: {
    height: scale(25),
    width: scale(25),
  },
  verticleLine: { height: "70%", width: 1, backgroundColor: colors.greyText, marginLeft: scale(8) },
  ProfileInputBox:{
    height: verticalScale(55),
    width: windowWidth - 80,
    alignSelf: "center",
    marginVertical: verticalScale(5),
  },
  title:{
    fontSize:moderateScale(16)/fontScalingFactor,
    // fontFamily:"Poppins-Regular",
    color:colors.black,

  },
  input: {
    paddingLeft: 15,
    height: scale(35),
    width: "100%",
    marginTop: scale(1),
    backgroundColor: colors.white,
    borderRadius: scale(8),
    color: colors.black,
    fontSize: moderateScale(12)/fontScalingFactor,
    borderWidth:0.5,
    borderColor:colors.black,
    // fontFamily:"Poppins-Regular",
},
})