import { Platform, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { colors } from '../../components/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontScalingFactor, successToast, windowWidth } from '../../components/CommonStyles'
import { images } from '../../components/Images'
import CommonButtons from '../../components/CommonButtons'
import LoadingComponent from '../../components/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { redeemCoupon } from '../../../redux/actions/mainAction'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

const RedeemCoupon = ({ route }) => {
    const token = useSelector(state => state.auth.accessToken)
     const navigation = useNavigation()
    const dispatch = useDispatch()
    const [couponText, setCouponText] = useState(route?.params?.couponCode)
    const [loader, setLoader] = useState(false)


    const redeemUserCoupon = async () => {
        try {
                setLoader(true)
                await dispatch(redeemCoupon(route?.params?.couponID, token)).then((res) => {
                    if (res.status == true) {
                        successToast(res.message)
                        navigation.goBack()
                        setLoader(false)
                    }
                }).catch((err) => {
                    setLoader(false)
                    errorToast("Network request failed")
                    console.log('err', err)
                })
          
        } catch (error) {
            setLoader(false)
            errorToast("Network request failed")
            console.log('catch err', error)
        }

    }
    return (
        <View style={styles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent />}
            <View style={styles.innerContainer}>
                <Text style={[styles.couponDetailText, { marginTop: verticalScale(5), color: colors.signUpBtn, width: "80%" }]}>During the trial period, you can typically enjoy all the functionalities available to regular paying customers, enabling you to make an informed decision before committing to a subscription or purchase.</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        editable={false}
                        value={couponText}
                        onChangeText={(t) => setCouponText(t)}
                        placeholder='Search'
                        style={styles.input}
                        placeholderTextColor={colors.signUpBtn}
                    />
                </View>

                <CommonButtons customStyle={styles.button} title='Redeem Coupon'
                    onPress={() => redeemUserCoupon()}

                />

            </View>

        </View>
    )
}

export default RedeemCoupon

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',

    },
    couponDetailText: {
        color: colors.descriptionColor,
        fontSize: moderateScale(9) / fontScalingFactor,
        fontWeight: '400',
        textAlign: "center"
    },
    innerContainer: {
        marginTop: verticalScale(35),
        alignItems: "center"
    },
    inputBox: {
        height: scale(40),
        width: windowWidth - scale(50),
        alignItems: "center",
        marginTop: "30%",
        borderWidth: Platform.OS == 'ios' ? scale(0.8) : scale(0.2),
        borderRadius: scale(4),
        borderColor: colors.greyText,
    },
    input: {
        height: "100%",
        width: "100%",
        paddingLeft: 15,
        fontSize: moderateScale(13) / fontScalingFactor,
        color: colors.black
    },
    button: {
        width: windowWidth - scale(50),
        marginTop: verticalScale(50),

    },
})