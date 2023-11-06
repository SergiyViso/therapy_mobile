import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { colors } from './Colors'
import StatusBarComponent from './StatusBarComponent'
import { moderateScale, scale } from 'react-native-size-matters'
import { fontScalingFactor, windowWidth } from './CommonStyles'
import { images,imageBaseUrl } from './Images'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
//import Orientation from 'react-native-orientation-locker'

const MainHeader = ({ backIcon, menu, customStyle }) => {
    console.log("welcome in Header")
    const userDetails = useSelector(state => state.auth.user)
    const navigation = useNavigation()
    return (
        <View style={styles.HeaderBox(customStyle)}>
            <StatusBarComponent backgroundColor={colors.signUpBtn} color={colors.white} />
            <View style={styles.contentBox}>
                <View style={styles.userDetails}>
                    <Image
                        source={userDetails.image ? { uri: `${imageBaseUrl}` + userDetails.image } : images.dp}
                        style={styles.profilePic}
                        resizeMode='cover'
                    />
                    <Text style={styles.heyText}>Hi</Text>
                    <Text numberOfLines={1} style={styles.userName}>, {userDetails.name}</Text>
                </View>
                {backIcon &&
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                        // Orientation.lockToPortrait()
                        
                    }} 
                    style={{height:scale(30),width:scale(30)}}
                    >

                        <Image
                            source={images.leftArrow}
                            style={styles.menu}
                        />
                    </TouchableOpacity>
                }
                {menu &&
                    <TouchableOpacity onPress={() => navigation.openDrawer()} >

                        <Image
                            source={images.menu}
                            style={styles.drawerMenu}
                            resizeMode='stretch'
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default memo(MainHeader)

const styles = StyleSheet.create({
    HeaderBox: (customStyle) => {
        return {
            height: scale(80),
            backgroundColor: colors.signUpBtn,
            width: windowWidth,
            borderBottomLeftRadius: scale(30),
            borderBottomRightRadius: scale(30),
            justifyContent: "center",
            ...customStyle
        }
    },
    contentBox: {
        height: "50%",
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    userDetails: {
        height: "100%",
        width: windowWidth / 2,
        alignItems: "center",
        flexDirection: "row"
    },
    profilePic: {
        height: scale(35),
        width: scale(35),
        borderRadius: scale(20),
        overflow: "hidden"
    },
    heyText:
    {
        fontSize: moderateScale(18)/fontScalingFactor,
        color: colors.white,
        fontWeight: "600",
        left: 6
    },
    userName: {
        fontSize: moderateScale(18)/fontScalingFactor,
        color: colors.white,
        left: 6,
        fontWeight: "600",
    },
    menu: {
        height: scale(18),
        width: scale(15),
        borderRadius: 20,
        overflow: "hidden",
        position: "absolute", right: 5,
        
        top:scale(5)
    },
    drawerMenu: {
         height: scale(15),
        width: scale(22),
        // borderRadius: 20,
        // overflow: "hidden",
        position: "absolute", right: 5,
    },
})