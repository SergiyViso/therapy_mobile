import { Alert, BackHandler, Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import StatusBarComponent from '../../components/StatusBarComponent'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import DashboardHeader from '../../components/DashboardHeader'
import { boxes } from '../../utils/utils'
import messaging from '@react-native-firebase/messaging'
import { CalenderBox, ChallengesBox, GoalBox, HomeworkBox, MonitorProgessBox, SymptomTrackingBox } from '../../components/DashBoardBoxes'
import { useDispatch, useSelector } from 'react-redux'
import { AfterTwoweeksstatus, getSymptomToTrack, getUserGoals, getUserHomeWork, getUserNotes, getUserSymptoms, getUserTrackingRecords } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'
//import Orientation from 'react-native-orientation-locker'
import { useIsFocused } from '@react-navigation/native'

import moment from 'moment'
const Dashboard = (props) => {
    const token = useSelector(state => state.auth.accessToken)
    const userDetails = useSelector(state => state.auth.user) 
    const [loader, setLoader] = useState(false)
    const [currentDate, setCurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [dateAfterWeek, setDateAfterWeek] = useState('')
    const dispatch = useDispatch()
   
    useEffect(() => {
        const createdDate = userDetails.created_at;
        
        if (createdDate) {
          const twoWeeksInMilliseconds = 14 * 24 * 60 * 60 * 1000;
          const createdDateMilliseconds = new Date(createdDate)?.getTime();
          
          if (!isNaN(createdDateMilliseconds)) {
            const twoWeeksLaterInMilliseconds = createdDateMilliseconds + twoWeeksInMilliseconds;
            const twoWeeksLaterDate = new Date(twoWeeksLaterInMilliseconds)?.toISOString().substring(0, 10);
            setDateAfterWeek(twoWeeksLaterDate);
            gettingUserData()
          } else {
            console.log("Invalid createdDate format");
          }
        } else {
          console.log("createdDate is undefined");
        }
      }, []);
      
    const gettingUserData = async () => {
        setLoader(true)
        await dispatch(getUserGoals(token))
        await dispatch(getUserSymptoms(token))
        await dispatch(getUserNotes(token))
        await dispatch(getUserHomeWork(token))
        await dispatch(getUserTrackingRecords(token))
        setLoader(false)
    }
    const Alertpopup = () => {
        Alert.alert('Subscribe', 'For access this buy the plan', [
            // {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            // },
            { text: 'OK', onPress: () => props.navigation.navigate('PlanScreen') }
        ])
    }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <StatusBarComponent backgroundColor={colors.signUpBtn} color />
            <DashboardHeader />
            {
                loader && <LoadingComponent />
            }
            <View style={styles.threeBoxes}>
                {
                    boxes.map((item, index) => {
                        return (
                            // <TouchableOpacity key={index} onPress={() => currentDate >= dateAfterWeek &&  : props.navigation.navigate("IndividualTherapy")}>
                             <TouchableOpacity key={index} onPress={() => userDetails.trial_end == true  && userDetails?.subscription_status == 0 ? Alertpopup() : props.navigation.navigate("IndividualTherapy")}> 
                                <ImageBackground style={styles.boxes}
                                    source={images.redBox}
                                    resizeMode='stretch'
                                >
                                    <Text style={styles.boxTitle}>{item.title1}</Text>
                                    <Text style={styles.boxTitle}>{item.title2}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={styles.clickHere}>Click here</Text>
                                        <Image
                                            source={images.rightArrow}
                                            style={{ height: scale(12), width: scale(12), left: scale(4), }}
                                        />
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{ height: Platform.isPad?windowHeight-scale(200): windowHeight - scale(250) }}>
                <ScrollView>
                    <View style={{padding:2,width:windowWidth - scale(60),alignSelf:"center",
                alignItems:"center"}}>

                        <CalenderBox onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0? Alertpopup() : props.navigation.navigate("Calendar")} />
                        <View style={{
                            flexDirection: "row", justifyContent: "space-between",
                            height: windowHeight * 0.17, alignSelf: "center", width: "99%"
                        }}>
                            <HomeworkBox onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0? Alertpopup() : props.navigation.navigate("MyHomeWorks")} />
                            <GoalBox onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0? Alertpopup() : props.navigation.navigate("Goals2")} />
                        </View>
                        <SymptomTrackingBox onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0? Alertpopup() : props.navigation.navigate("Symptomtracking")} />
                        <MonitorProgessBox onPress={() => userDetails.trial_end === true  && userDetails?.subscription_status == 0? Alertpopup() : props.navigation.navigate("GraphNavigations")} />

                    </View>
                </ScrollView>
            </View>



        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    threeBoxes: {
        // height:scale(80),
        width: windowWidth - scale(50),
        alignSelf: "center",
        top: -verticalScale(25),
        flexDirection: "row"
    },
    boxes: {
        height: scale(70),
        width: windowWidth / 3.8,
        marginHorizontal: 4,
        // backgroundColor:colors.buttonColor,
        borderRadius: 10,
        padding: moderateScale(8),
        justifyContent: "center"
    },
    boxTitle: {
        fontSize: moderateScale(14) / fontScalingFactor,
        color: colors.white,
        fontWeight: "600"
    },
    clickHere: {
        fontSize: moderateScale(10) / fontScalingFactor,
        color: colors.white
    },
    commonBox: {
        flexDirection: "row",
        height: scale(70),
        width: windowWidth - scale(60),
        alignSelf: "center",
        // backgroundColor: "#76546756",
        marginVertical: scale(10),
        borderRadius: moderateScale(10),
        alignItems: "center"
    },
    clickHereBox: {
        flexDirection: "row", alignItems: "center",

    }
})