import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, scale } from 'react-native-size-matters'
import { fontScalingFactor, windowWidth } from './CommonStyles'
import { colors } from './Colors'
import { images } from './Images'

const CommonButtons = ({title,onPress=()=>{},leftIcon,customStyle,customText}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.btnStyle(customStyle,leftIcon)}>
        {
            leftIcon && <Image
            source={leftIcon}
            style={styles.btnIcon}
            resizeMode='stretch'
          />
        }
      <Text style={styles.btnText(customText)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CommonButtons

const styles = StyleSheet.create({
    btnStyle:(customStyle,leftIcon)=>{
        return{

            height:scale(50),width:windowWidth/2.8,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:colors.buttonColor,
            flexDirection:"row",
            borderRadius:scale(10),
            ...customStyle
        }
    },
    btnText:(customText)=>{
        return{
        color:colors.white,
        fontSize:moderateScale(16)/fontScalingFactor,
        fontWeight:"500",
        paddingHorizontal:scale(10),
        // fontFamily:"Inter",
        ...customText
        }
    },
    btnIcon:{
        height:scale(15),
        width:scale(15),
    }
})