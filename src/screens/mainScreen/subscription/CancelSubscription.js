import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletesubscription } from '../../../../redux/actions/mainAction'
import { SafeAreaView } from 'react-native'
import MainHeader from '../../../components/MainHeader'
import LoadingComponent from '../../../components/LoadingComponent'
import { commonStyles, fontScalingFactor, windowWidth } from '../../../components/CommonStyles'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../../components/Colors'
import CommonButtons from '../../../components/CommonButtons'
import { getUserProfile } from '../../../../redux/actions/authAction'

const CancelSubscription = (props) => {
    const subscriptionDetail = useSelector(state => state.auth.subscriptionDetail)
    const isToken = useSelector(state => state.auth.accessToken);
    const [loader, setloader] = useState(false);
    const userDetails = useSelector(state => state.auth.user)
    const dispatch = useDispatch(   )
    const onCancelSubscription = () => {
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
              
                setloader(false)
            });
    }
    // alert(userDetails?.subscription_status)
    const plans = [
        { id: 0, amount: "$6", price: "price_1MvE8RLKxcJdHcEhH6ccXhTx", },
        { id: 1, amount: "$56", price: "price_1MvE8vLKxcJdHcEhEBX8FH0O", },
    ]
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
                <CommonButtons title={subscriptionDetail?.plan_id == item.price && userDetails.subscription_status == 1 ? "Cancel" : 'Subscribe'}
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
                <CommonButtons title={subscriptionDetail?.plan_id == item.price && userDetails.subscription_status == 1 ? "Cancel" : 'Subscribe'}
                    customStyle={styles.planBtn}
                    onPress={() => {
                        if (userDetails?.subscription_status == 1) {
                            onCancelSubscription()
                            // props.navigation.navigate("CancelSubscription", {
                            //     price: item.price
                            // })
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
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent /> }
            
            <View style={styles.mainBox}>
                <Text style={styles.screenTitle}>{"Change your current Plan"}</Text>
                { 
                <Text style={styles.screenDes}>Here you will have to cancel your current plan if you are looking for change in Plan. You can change or upgrade your plans anytime you want.</Text>
                }
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

export default CancelSubscription

const styles = StyleSheet.create({
    mainBox: {
        // height: windowHeight / 2.2,
        width: windowWidth,
        // backgroundColor: "red",
        marginVertical: scale(15),
        padding: scale(20),
        // flexDirection: "row",

    },
    screenTitle: {
        fontSize: moderateScale(20) / fontScalingFactor,
        // alignSelf: 'center',
        fontWeight: '600',
        color: colors.signUpBtn,
        marginTop: scale(-10),
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
})