import { FlatList, Modal, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../../components/CommonStyles'
import MainHeader from '../../../components/MainHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../../components/Colors'
import CommonButtons from '../../../components/CommonButtons'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deletesubscription } from '../../../../redux/actions/mainAction'
import { getUserProfile } from '../../../../redux/actions/authAction'
import LoadingComponent from '../../../components/LoadingComponent'

const PlanScreen = (props) => {

    const userDetails = useSelector(state => state.auth.user)
    // console.log("userDetailsuserDetails",userDetails)
    const subscriptionDetail = useSelector(state => state.auth.subscriptionDetail)
    // console.log('subscriptionDetail1213',subscriptionDetail)
    const isToken = useSelector(state => state.auth.accessToken);
    const [loader, setloader] = useState(false);
    const [modal, setModal] = useState(false);
    const [isSubscription, setIsSubscription] = useState(false);

     console.log(JSON.stringify(userDetails),"hjhjkgjjkhjk")
    const plans = [
        { id: 0, amount: "$6", price: "price_1MvE8RLKxcJdHcEhH6ccXhTx", },
        { id: 1, amount: "$56", price: "price_1MvE8vLKxcJdHcEhEBX8FH0O", },
    ]
    console.log(userDetails.subscription_status,"hsdgjsfsjfjasfasfasfafas");
    const renderPlansList = ({ item, index }) => {
        return (
            userDetails.subscription_status == 0 || userDetails.subscription_status == null ?
            <View style={styles.plansBox}>
                <View style={styles.boxHeader}>
                    <Text style={styles.boxTitle}>
                        {index == 0 ? "Monthly" : "Yearly"}
                    </Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <Text style={[styles.planAmount,{fontStyle:'italic',fontWeight:"400",fontSize:moderateScale(13)/fontScalingFactor}]}>Special introductory prices!   </Text>
                <Text style={styles.planAmount}>{item.amount}</Text>
                </View>
                <CommonButtons title={subscriptionDetail?.plan_id == item.price && userDetails.subscription_status == 1 ? "change subscription" : 'Subscribe'}
                    customStyle={styles.planBtn}
                    onPress={() => {
                        if (userDetails?.subscription_status == 1) {
                            onCancelSubscription()
                        } else {
                            props.navigation.navigate("CardScreen", {
                                price: item.price
                            })
                        }
                        // props.navigation.navigate("CardScreen", {
                        //     price: item.price
                        // })
                    }

                    } />
            </View>
            :(subscriptionDetail?.plan_id &&subscriptionDetail?.plan_id == item.price)&&
            <View style={styles.plansBox}>
                <View style={styles.boxHeader}>
                    <Text style={styles.boxTitle}>
                        {index == 0 ? "Monthly" : "Yearly"}
                    </Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <Text style={[styles.planAmount,{fontStyle:'italic',fontWeight:"400",fontSize:moderateScale(13)/fontScalingFactor}]}>Special introductory prices!   </Text>
                <Text style={styles.planAmount}>{item.amount}</Text>
                </View>
                <CommonButtons title={subscriptionDetail?.plan_id == item.price && userDetails.subscription_status == 1 ? "Change subscription" : 'Subscribe'}
                    customStyle={styles.planBtn}
                    onPress={() => {
                        if (userDetails?.subscription_status == 1) {
                            // onCancelSubscription()
                            props.navigation.navigate("CancelSubscription", {
                                price: item.price
                            })
                        } else {
                            props.navigation.navigate("CardScreen", {
                                price: item.price
                            })
                        }
                        // props.navigation.navigate("CardScreen", {
                        //     price: item.price
                        // })
                    }

                    } />
            </View>
        )
    }
    const dispatch = useDispatch()
    const onCancelSubscription = () => {
        setModal(true)
        setloader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer sk_test_51MpIOrLKxcJdHcEhvQLoSQouZtPtNzxHK2Nh5O05EZoD3YZEUqNLPEH2Rzkw9OeHlOHKPMq9xOloY4Vk1VXWTop500RJX5uLyJ`);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionDetail?.subscription_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setModal(false)
                setloader(false)
                const res = JSON.stringify(result)
                console.log("isToken890890809", res, "new result are the", result)

                dispatch(deletesubscription(isToken)).then((res) => {
                    console.log("8798798798798", res)
                    dispatch(getUserProfile(isToken)).then((res) => {
                        console.log("user hjhkljkjkljlk", res)
                    })
                })

            }).catch(error => {
                console.log('Cancel subscription error', error)
                setModal(false)
                setloader(false)
            });
    }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent /> }
            <Modal visible={modal} animationType="slide" transparent={true}>
                <View
                    style={{
                        backgroundColor: '#00000080',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                
                </View>
            </Modal>
            <View style={styles.mainBox}>
                <Text style={styles.screenTitle}>{userDetails.subscription_status == 1?"Your Current Plan":"Subscription Plans"}</Text>
                {/* {  */}
                <Text style={styles.screenDes}>Choose your subscription here. Feel free to come back at any time to change your subscription or cancel your service.</Text>
                <FlatList
                    data={plans}
                    keyExtractor={item => item.id}
                    renderItem={renderPlansList}
                    // horizontal={true}
                    scrollEnabled={false}
                />
            </View>
        </SafeAreaView>
    )
}

export default PlanScreen

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: moderateScale(20) / fontScalingFactor,
        // alignSelf: 'center',
        fontWeight: '600',
        color: colors.signUpBtn,
        marginTop: scale(-10),
    },
    mainBox: {
        // height: windowHeight / 2.2,
        width: windowWidth,
        // backgroundColor: "red",
        marginVertical: scale(15),
        padding: scale(20),
        // flexDirection: "row",

    },
    plansBox: {
        // height: "90%",
        width: windowWidth -scale(40),
        backgroundColor: "#f1f1f1",
        marginVertical: scale(5),
        alignSelf: "center",
        alignItems: "center",
        borderRadius: scale(10)
        // justifyContent:"center"
    },
    boxHeader: {
        height: scale(40),
        width: "100%",
        backgroundColor: colors.signUpBtn,
        alignItems: "center",
        justifyContent: "center"
    },
    boxTitle: {
        fontSize: moderateScale(16) / fontScalingFactor,
        alignSelf: "center",
        fontWeight: "400",
        color: colors.buttonColor, marginVertical: scale(10),
        // fontFamily:"Inter"
    },
    planAmount: {
        fontSize: moderateScale(18) / fontScalingFactor,
        alignSelf: "center",
        fontWeight: "800",
        color: colors.signUpBtn, marginVertical: scale(10),
    },
    text: {
        fontSize: moderateScale(13) / fontScalingFactor,
        alignSelf: "center",
        fontWeight: "500",
        color: colors.signUpBtn, marginVertical: scale(10),
    },
    planBtn: {
        height: scale(35),
        width: "80%",
        marginVertical: scale(10)
    },
    screenDes: {

        color: colors.black,
        fontSize: moderateScale(12) / fontScalingFactor,
        fontWeight: "300",
        marginVertical:verticalScale(8)
        // paddingHorizontal: scale(10)
      },
})