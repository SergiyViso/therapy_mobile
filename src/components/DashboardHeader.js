import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { images,imageBaseUrl } from './Images'
import { colors } from './Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontScalingFactor, windowHeight, windowWidth } from './CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const DashboardHeader = (props) => {
    const userDetails = useSelector(state=>state.auth.user)
    const [ search ,setSearch ]= useState("")
    const navigation = useNavigation()
    return (
        <View style={styles.headerBox}>
            <View style={styles.topBox}>
                <Image
                    source={userDetails.image ? { uri: `${imageBaseUrl}` + userDetails.image } : images.dp}
                    style={styles.profilePic}
                    resizeMode='cover'
                />
                <Text style={styles.heyText}>Hi</Text>
                <Text numberOfLines={1} style={styles.userName}>, {userDetails.name}</Text>
                <TouchableOpacity onPress={()=>navigation.openDrawer()} style={styles.menu}>
                <Image
                    source={images.menu}
                    style={styles.menuImage}
                    resizeMode="contain"
                    />
                    </TouchableOpacity>
            </View>
            {/* <View style={styles.inputBox}>
                <TextInput 
                value={search}
                onChangeText={(t)=>setSearch(t)}
                placeholder='Search'
                style={styles.input}
                placeholderTextColor={colors.signUpBtn}
                />
                <Image
                    source={images.search}
                    style={styles.search}
                    resizeMode="contain"
                />
            </View> */}
        </View>
    )
}

export default DashboardHeader

const styles = StyleSheet.create({
    headerBox: {
        // height: windowHeight / 5,
        height: windowHeight / 8,
        width: windowWidth,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: colors.signUpBtn
    },
    topBox: {
     
        height: "25%",
        width: "90%",
        alignSelf: "center",
        top: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    profilePic: {
        height: verticalScale(35),
        width: verticalScale(35),
        borderRadius: verticalScale(17.5),
        overflow: "hidden"
    },
    search: {
        height: scale(18),
        width: scale(18),
        position: "absolute",
        right: scale(10)
    },
    menu: {
        height: scale(14),
        width: scale(14),
        position: "absolute",
        right: scale(15)
    },
    menuImage: {
        height: scale(20),
        width: scale(20),
        
    },
    heyText:
        { fontSize: moderateScale(16)/ fontScalingFactor, color: colors.white, fontWeight: "600", left: 6 },
    userName: { fontSize: moderateScale(16)/ fontScalingFactor, color: colors.white, left: 6, fontWeight: "600" },
    inputBox: {
        height: "25%",
        backgroundColor: colors.white,
        marginTop: scale(25),
        width: '85%',
        alignSelf: "center",
        borderRadius: 8,
        flexDirection:"row",
        alignItems:"center"
    },
    input:{
        height:"100%",
        width:"85%",
        paddingLeft:15
    }

})