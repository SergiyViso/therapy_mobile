import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from './Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { PaddingHorizontal } from './Styles'
import { images } from './Images'
import { fontScalingFactor } from './CommonStyles'

const TextInputComponent = ({ placeholder, value, handleChangeText = (t) => { }, keyboardType, secureTextEntry, icon, maxLimit, pass, closeEye }) => {
    const [isShow, setisShow] = useState(false);
    useEffect(() => {
        if (closeEye) {
            setisShow(true)
        }
    }, [])
    return (
        <View style={styles.conatiner}>
            <Image
                source={icon}
                style={styles.imageIcon}
                resizeMode="contain"
            />
            <PaddingHorizontal number={5} />
            <View style={styles.line} />
            <PaddingHorizontal number={5} />
            <TextInput
                placeholder={placeholder}
                value={value}
                placeholderTextColor={colors.greyText}
                style={secureTextEntry ? styles.inputStyles : styles.inputStyles1}
                secureTextEntry={pass ? true : isShow}
                keyboardType={keyboardType}
                maxLength={maxLimit ? maxLimit : 100}
                onChangeText={(t) => {
                    handleChangeText(t)
                }}
            />
            {pass ?
                null :
                secureTextEntry ? !isShow ?
                    <TouchableOpacity onPress={() => setisShow(!isShow)} style={styles.secureIcon}>
                        <Image
                            source={images.Show}
                            style={styles.imageIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setisShow(!isShow)} style={styles.secureIcon}>
                        <Image
                            source={images.hidePass}
                            style={styles.imageIcon}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    : null
            }
        </View>
    )
}

export default TextInputComponent

const styles = StyleSheet.create({
    conatiner: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: scale(45),
        borderBottomWidth: 1,
        borderColor: colors.greyText,
        marginVertical: scale(5)
    },
    secureIcon: {
        width: scale(40),
        height: scale(40),
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 5,
        // backgroundColor:"red"
    },
    line: {
        height: "70%",
        width: 1.5,
        backgroundColor: colors.greyText
    },
    inputStyles: {
        fontSize: moderateScale(13) / fontScalingFactor,
        width: "68%",
        color: colors.black
    },
    inputStyles1: {
        fontSize: moderateScale(13) / fontScalingFactor,
        width: "80%",
        color: colors.black
    },
    imageIcon: {
        width: verticalScale(20),
        height: verticalScale(20),
    },
})