import { StyleSheet, Text, View, FlatList, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { useSelector } from 'react-redux'
import { colors } from '../../components/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import moment from 'moment'
import { images } from '../../components/Images'
import { fontScalingFactor } from '../../components/CommonStyles'
import CommonButtons from '../../components/CommonButtons'
import { FAB } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const Coupons = (props) => {
    const userPromoCode = useSelector(state => state.auth.promocode)
    const [userCoupon, setUserCoupon] = useState(userPromoCode)

    const renderItem = ({ item, index }) => {
     return (
            item.coupon != null &&
            <View style={styles.renderContainer}>
             
                <Image
                    source={images.couponImage}
                    style={{ height: verticalScale(40), width: verticalScale(50) }}
                    resizeMode='contain'
                />
                <View style={{ width: "85%", height: verticalScale(100), alignItems: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "100%", alignItems: "center", paddingHorizontal: scale(12) }}>

                        <Text style={styles.renderText}>{item.coupon.code}</Text>
                        <TouchableOpacity onPress={()=>props.navigation.navigate('RedeemCoupon',{
                            "couponID":item.coupon_id,"couponCode":item.coupon.code
                        })}>
                        <Text style={[styles.renderText, { color: colors.buttonColor }]}>Apply</Text>
                        </TouchableOpacity>
                      
                    </View>
                    <Text style={[styles.couponDetailText, { marginTop: verticalScale(5), color: colors.signUpBtn, width: "80%" }]}>Using the coupon code FREE{item.coupon.days}DAYS allows you to enjoy a {item.coupon.days}-day free trial of this Application.</Text>
                    <Text style={[styles.couponDetailText, { marginTop: verticalScale(5), color: colors.signUpBtn, width: "80%" }]}>During the trial period, you can typically enjoy all the functionalities available to regular paying customers, enabling you to make an informed decision before committing to a subscription or purchase.</Text>
                 
                </View>
            </View>
             )
    }

    return (
        <View style={styles.mainContainer}>
            <MainHeader backIcon />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.list}>
                    <FlatList
                        data={userCoupon}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
            {/* <FAB
                icon="plus"
                color='#fff'
                size='medium'
                style={styles.fab}
                onPress={() => props.navigation.navigate('RedeemCoupon')}
            /> */}
        </View>
    )
}

export default Coupons

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30,
        marginTop: 20
    },
    renderContainer: {
        backgroundColor: colors.notes + "33",
        borderRadius: 10,
        borderStyle: "dashed",
        borderColor: colors.descriptionColor,
        borderWidth: 1.5,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
        height: verticalScale(140),

    },
    list: {
        marginHorizontal: 35
    },
    separator: {
        marginTop: 10,
        backgroundColor: 'gray',
        height: 1
    },
    renderinnerContainer: {
        width: '35%',
        //  backgroundColor:"yellow"
    },
    renderText: {
        color: colors.black,
        fontSize: moderateScale(13) / fontScalingFactor,
        fontWeight: '700',
        alignSelf: "flex-start",
       
    },
    couponDetailText: {
        color: colors.descriptionColor,
        fontSize: moderateScale(9) / fontScalingFactor,
        fontWeight: '400',
    },
    // fab: {
    //     position: 'absolute',
    //     margin: 16,
    //     right: 20,
    //     bottom: 30,
    //     borderRadius: 30,
    //     backgroundColor: colors.signUpBtn
    // },
})