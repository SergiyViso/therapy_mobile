import {
    Alert,
    Image, KeyboardAvoidingView, Modal, PermissionsAndroid, Platform, SafeAreaView,
    ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import { imageBaseUrl, images } from '../../components/Images'
import { ProfileInputs } from '../../components/CommonInputs'
import CommonButtons from '../../components/CommonButtons'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { updateProfile } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'
import { getUserProfile } from '../../../redux/actions/authAction'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CommonModal from '../../components/CommonModal'
import { useIsFocused } from '@react-navigation/native'

const UserProfile = (props) => {
    const userDetails = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.accessToken)
    const [userName, setUserName] = useState(userDetails.name)
    const [email, setEmail] = useState(userDetails.email)
    const [mobile, setMobile] = useState(userDetails.phone_number)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState(false);

    const [saveImage, setSaveImage] = useState("")
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const createTwoButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    useEffect(() => {
        setUserName(userDetails.name)
        setEmail(userDetails.email)
        setMobile(userDetails.phone_number)
    }, [isFocused])
    const saveData = () => {
        var login = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (userName.trim() == "") {
            errorToast("Username is Required")
        }
        else if (email.trim() == "") {
            errorToast("Email is Required")
        }
        else if (login.test(email.trim()) == false) {
            errorToast('Please enter valid email')
        }
        // else if (mobile.trim() == "" || mobile == null) {
        //     errorToast("Phone Number is Required")
        // }
        else {
            setLoader(true)
            dispatch(updateProfile(token, userName, email, saveImage))
                .then(async (res) => {
                    if (res.success == true) {
                        setLoader(false)

                        await dispatch(getUserProfile(token))
                        successToast(res.message)
                    } else {
                        errorToast(res.message)
                    }
                    setLoader(false)
                    console.log(res);
                }).catch(Error => {
                    setLoader(false)
                    console.log("sadsgadsgadsgasd", Error)
                })
        }
    }
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
            <MainHeader backIcon />
            {
                modal &&
                <CommonModal isVisible={modal} onChange={(value) => setModal(value)}
                    onSelectImage={(image) => setSaveImage(image)} />
            }
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "height" : "padding"}
                    style={{ flex: 1 }}
                >
                    {loader && <LoadingComponent />}
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity onPress={() => setModal(true)} style={styles.dpCircle}>
                        <Image
                            source={saveImage ? saveImage : userDetails.image ? { uri: `${imageBaseUrl}` + userDetails.image } : images.dp}
                            style={styles.dp}
                            resizeMode='cover'
                        />
                        <Image
                            source={images.cameraBackground}
                            style={styles.cameraBackground}
                            resizeMode='contain'
                        />
                        <Image
                            source={images.camera}
                            style={styles.camera2}
                            resizeMode='contain'
                        />

                    </TouchableOpacity>
                    <Text style={styles.text1}>Change Picture</Text>
                    <ProfileInputs title={"Username"} value={userName} onChange={(t) => setUserName(t)} />
                    <ProfileInputs title={"Email"} value={email} onChange={(t) => setEmail(t)} />
                    {/* <ProfileInputs title={"Phone Number"} value={mobile} onChange={(t) => setMobile(t)} /> */}
                    <Text style={styles.passwordText}>Password </Text>
                    <View style={styles.passwordBox}>
                        <Text style={styles.passwordText2}>************</Text>
                        <CommonButtons title={"Change Password"} customStyle={styles.changePassword}
                            customText={{ fontSize: moderateScale(10) / fontScalingFactor }}
                            onPress={() => props.navigation.navigate("ChangePasswordScreen")}
                        />
                    </View>
                    <CommonButtons title={"Update"} customStyle={styles.btnStyle1}
                        onPress={() => saveData()}
                    />
                    <View style={styles.greyLine}></View>
                    <CommonButtons title={"Delete Account"}
                        customStyle={styles.btnStyle2}
                        leftIcon={images.whiteTrash}
                    //   onPress={()=>createTwoButtonAlert()}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(20) / fontScalingFactor,
        alignSelf: "center",
        marginTop: scale(20),
        color: colors.signUpBtn,
        fontWeight: "700",
        // fontFamily: "PlusJakartaSans-Italic-VariableFont_wght"
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
        fontSize: moderateScale(14) / fontScalingFactor,
        alignSelf: "center",
        marginTop: scale(8),
        color: colors.black,
        fontWeight: "400",
        // fontFamily: "Poppins-Regular"
    },
    btnStyle1: {
        width: windowWidth / 1.8,
        alignSelf: "center", height: scale(35),
        marginVertical: scale(15)
    },
    btnStyle2: {
        width: windowWidth - scale(70),
        alignSelf: "center",
        height: scale(35),
        marginVertical: scale(15),
        backgroundColor: colors.signUpBtn
    },
    changePassword: {
        width: "45%",
        alignSelf: "center",
        height: "95%",
        marginVertical: scale(15),
        backgroundColor: colors.buttonColor,
        borderRadius: scale(6)
    },
    greyLine: {
        height: 1,
        width: windowWidth - scale(70),
        backgroundColor: colors.greyText,
        alignSelf: "center",
        marginTop: scale(20)
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "#00000066"
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
    passwordBox: {
        paddingLeft: 15,
        height: scale(35),
        width: windowWidth - 80,
        marginTop: scale(1),
        backgroundColor: colors.white,
        borderRadius: scale(8),
        color: "black",
        fontSize: moderateScale(12) / fontScalingFactor,
        borderWidth: 0.5,
        borderColor: colors.black,
        // fontFamily: "Poppins-Regular",
        alignSelf: "center",
        marginTop: scale(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(1),
    },
    passwordText: {
        fontSize: moderateScale(17) / fontScalingFactor,
        // fontFamily:"Poppins-Regular",
        color: colors.black,
        left: scale(35),
        bottom: scale(-5)

    },
    passwordText2: {
        fontSize: moderateScale(17) / fontScalingFactor,
        // fontFamily:"Poppins-Regular",
        color: colors.black,
        bottom: scale(-1)

    },

})