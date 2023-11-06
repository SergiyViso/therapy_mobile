import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import { images } from '../../components/Images'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import CommonButtons from '../../components/CommonButtons'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <Image
                source={images.welcomeLogo}
                style={styles.topImage}
                resizeMode='stretch'
            />
            <View style={styles.contentBox}>
                <Image
                    source={images.appLogo}
                    style={styles.appLogo}
                    resizeMode='stretch'
                />
                <Text style={styles.titleText}>Start taking notes and upgrade your therapy!</Text>
                <Text style={styles.descriptionText}>Notes For Therapy was created to help maximize your therapy experience. Have you ever felt rushed going into a therapy session and realized you didn’t know what you wanted to talk about? Notes For Therapy will keep all that information at your fingertips!</Text>
                    <View style={styles.btnBox}>
                    <CommonButtons title='Login' leftIcon={images.userLogin} onPress={()=>navigation.navigate("LoginScreen")} />
                    <CommonButtons title='Sign Up' leftIcon={images.userSignup} customStyle={styles.signUpBtn}
                    onPress={()=>navigation.navigate("SignUp")} 
                    />
                    
                    </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    topImage: {
        height: windowHeight / 3.4,
        width: windowHeight / 2.8,
        marginTop: scale(40),
        alignSelf: "center",
        maxWidth:scale(260)
    },
    contentBox: {
        height: windowHeight / 1.7,
        width: windowWidth,
        backgroundColor: "#f9f9f9",
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: scale(25),
        borderTopLeftRadius: scale(25),
        alignItems: "center",
    },
    appLogo: {
        height: scale(70),
        width: scale(70),
        marginTop: scale(-28),
        // alignSelf:"center",
        borderRadius: scale(35)
    },
    titleText: {
        color: colors.signUpBtn,
        fontSize: moderateScale(21)/fontScalingFactor,
        alignSelf: "center",
        fontWeight: "700",
        paddingHorizontal: scale(35),
        marginVertical: scale(25),
        textAlign:'center'
    },
    descriptionText: {
        color: colors.descriptionColor,
        fontSize: moderateScale(12)/fontScalingFactor,
        alignSelf: "center",
        fontWeight: "400",
        paddingHorizontal: scale(35),
        marginTop: scale(-10),
        textAlign:'center'
    },
    btnBox:{
        height:scale(80),
        width:windowWidth-50,alignSelf:"center",
        marginTop:scale(20),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingHorizontal:scale(20)
    },
    signUpBtn:{
        backgroundColor:colors.signUpBtn    
    }
})