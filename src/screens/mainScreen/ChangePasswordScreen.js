import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import { errorToast, fontScalingFactor, successToast, windowWidth } from '../../components/CommonStyles'
import { ProfileInputs } from '../../components/CommonInputs'
import { useState } from 'react'
import CommonButtons from '../../components/CommonButtons'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserPassword } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'

const ChangePasswordScreen = (props) => {
    const token = useSelector(state => state.auth.accessToken)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [conFirmPass, setConfirmPass] = useState("")
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()
    const handlePassword = () => {
        if (oldPassword.trim() == "") {
            errorToast("Please Enter Current-Password!")
        } else if (newPassword.trim() == "") {
            errorToast("Please Enter New-Password!")
        }
        else if (newPassword.trim().length < 6 || newPassword.trim().length > 13) {
            errorToast("Password must be 6-13 characters")
        }
        else if (conFirmPass.trim() == "") { 
                errorToast("Please Enter Confirm-Password!")
            }
            else if (newPassword != conFirmPass) {
                errorToast("New-Password and Confirm-Password does not match!")
            } else {
                setLoader(true)
                var formdata = new FormData()
                formdata.append("currentpassword", oldPassword)
                formdata.append("password", newPassword)
                formdata.append("password_confirmation", conFirmPass)
                dispatch(changeUserPassword(token, formdata)).then(async res => {
                    console.log(res, "Chsnge password response!!!!");
                    if (res.status == true) {
                        successToast(res.message)
                        props.navigation.goBack()
                    } else {
                        errorToast(res.message)
                    }
                    setLoader(false)
                }).catch(e => {
                    console.log(e);
                    setLoader(false)
                })
            }
    }
    return (
        <SafeAreaView>
            <MainHeader backIcon />
            {loader && <LoadingComponent />}
            <Text style={styles.title}>Change Password</Text>
            <ProfileInputs title={"Enter Current Password"} value={oldPassword} onChange={(t) => setOldPassword(t)} placeHolder='Enter here' />
            <ProfileInputs title={"New Password"} value={newPassword} onChange={(t) => setNewPassword(t)} placeHolder='Enter here' />
            <ProfileInputs title={"Confirm-Password"} value={conFirmPass} onChange={(t) => setConfirmPass(t)} placeHolder='Enter here' />
            <CommonButtons title={"Update"} customStyle={styles.btnStyle2} onPress={() => handlePassword()} />
        </SafeAreaView>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(20) / fontScalingFactor,
        alignSelf: "center",
        marginTop: scale(20),
        color: colors.signUpBtn,
        fontWeight: "700",
        // fontFamily: "PlusJakartaSans-Italic-VariableFont_wght",
        marginBottom: scale(40)
    },
    btnStyle2: {
        width: windowWidth / 2,
        alignSelf: "center",
        height: scale(35),
        marginVertical: scale(15),
    },
})