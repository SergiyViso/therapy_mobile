import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from './Images'
import { colors } from './Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontScalingFactor, windowHeight, windowWidth } from './CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const DashBoardBoxes = () => {
    return (
            <Text>DashBoardBoxes</Text>
    )
}

export const CalenderBox = ({onPress = ()=>{ }}) => {
    const navigation = useNavigation()
    const status = useSelector(state=>state.main.activestatus)
    // {alert(status)}
    return (
        <TouchableOpacity activeOpacity={1} onPress={()=>{
            // navigation.navigate("Calendar")
            onPress()
       
            } } style={styles.commonBox}>
            <Image
                source={images.calenderImage}
                style={{ height: "95%", width: "65%", left:5, }}
                // resizeMethod='resize'
                resizeMode='contain'
            />
            <View style={{ paddingLeft: scale(15),height:"100%",width:"35%",justifyContent:"center" }}>
                <Text style={[styles.boxTitle, { color: colors.signUpBtn }]}>Calendar</Text>
                <View style={styles.clickHereBox}>
                    <Text style={[styles.clickHere, { color: colors.signUpBtn, marginLeft: 3 }]}>Click here</Text>
                    <Image
                        source={images.redRightArrow}
                        style={{ height: 12, width: 12, left: 4 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
export const SymptomTrackingBox = ({onPress = ()=>{ }}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={1} onPress={()=>
        {  onPress()
            // navigation.navigate("Symptomtracking")
        
        }} style={styles.commonBox}>
             <Image
                source={images.SymptomTrackingIcon}
                style={{ height: "95%", width: "65%",maxWidth:scale(200), left:5, }}
                resizeMode='contain'
            />
            <View style={{ paddingLeft: scale(15),height:"100%",width:"35%",justifyContent:"center" }}>
                <Text style={[styles.boxTitle, { color: colors.signUpBtn }]}>Symptom Tracking</Text>
                <View style={styles.clickHereBox}>
                    <Text style={[styles.clickHere, { color: colors.signUpBtn, marginLeft: 3 }]}>Click here</Text>
                    <Image
                        source={images.redRightArrow}
                        style={{ height: 12, width: 12, left: 4 }}
                    />
                </View>
            </View>
           
        </TouchableOpacity>
    )
}
export const HomeworkBox = ({onPress = ()=>{ }}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={()=>{onPress()
            // navigation.navigate("MyHomeWorks")
            }} activeOpacity={1} style={styles.middleBox} >

            <View style={{ paddingLeft: scale(15),top:"35%", position: "absolute", right: scale(5),zIndex:9 }}>
                <Text style={[styles.boxTitle, { color: colors.signUpBtn, zIndex: 3, }]}>Homework</Text>
                <View style={styles.clickHereBox}>
                    <Text style={[styles.clickHere, { color: colors.signUpBtn, marginLeft: 3 }]}>Click here</Text>
                    <Image
                        source={images.redRightArrow}
                        style={{ height: 12, width: 12, left: 4 }}
                    />
                </View>
            </View>
            <Image
                source={images.homeWork}
                style={{ height: "90%", width: "65%",left:scale(2) }}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

export const GoalBox = ({onPress = ()=>{ }}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity activeOpacity={1} style={styles.newGoalBox} onPress={()=>{
            onPress()
            // navigation.navigate("Goals")
            }}>
           
            <Image
            resizeMode='contain'
                source={images.goalsScreenImage}
                style={{ height: "72%",
                 width: "70%",
                marginLeft:verticalScale(22)}}
            />
            
         
            <View style={{ marginLeft:"28%", position: "absolute",zIndex:33,bottom:scale(0),
            alignItems:"center",height:verticalScale(40) }}>
                <Text style={[styles.boxTitle, { color: colors.signUpBtn,alignSelf:"center" }]}>Goals</Text>
                <View style={styles.clickHereBox}>
                    <Text style={[styles.clickHere, { color: colors.signUpBtn, marginBottom:2 }]}>Click here</Text>
                    <Image
                        source={images.redRightArrow}
                        style={{ height: 12, width: 12, left: 4 }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
export const MonitorProgessBox = ({onPress = ()=>{ }}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={[styles.commonBox,{marginTop:scale(0)}]}
         onPress={()=>{
            onPress()
            //  navigation.navigate("SymptomsGraph")
            }}
        >

        <Image
            source={images.monitorProgress}
            style={{ height: "99%", width: "99%",borderRadius:verticalScale(13),left:2, }}
            resizeMode='stretch'
        
            />
        <View style={styles.upeerTextView}>
            <Text style={styles.monitorBoxTitle}>Monitor Your Progress</Text>
            <View style={styles.clickHereBox}>
                <Text style={[styles.clickHere, { color: colors.signUpBtn, marginLeft: 3 }]}>Click here</Text>
                <Image
                    source={images.redRightArrow}
                    style={{ height: 12, width: 12, left: 4 }}
                    />
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default DashBoardBoxes

const styles = StyleSheet.create({
    boxTitle: {
        fontSize: moderateScale(16)/fontScalingFactor,
        color: colors.white,
        fontWeight: "600"
    },
    clickHere: {
        fontSize: moderateScale(10)/fontScalingFactor,
        color: colors.white,
        fontWeight: "400"
    },
    commonBox: {
        flexDirection: "row",
        height: windowHeight * 0.17,
        width: "99%",
        alignSelf: "center",
        marginVertical: scale(10),
        borderRadius: scale(10),
        alignItems: "center",
        // shadowColor: colors.black,
        // shadowOffset: { height: 1, width: 1 },
        // shadowOpacity: 1,
        // shadowRadius: 1,
        // elevation: 1,
         overflow: "hidden",
        borderWidth:0.3
    },
    GoalBox: {
        flexDirection: "row",
        height: windowHeight * 0.17,
        width: windowWidth / 3,
        alignSelf: "center",
        marginVertical: scale(10),
        borderRadius: moderateScale(10)/fontScalingFactor,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 5,
        shadowRadius: 2,
        elevation: 1
        , overflow: "hidden"
    },
    newGoalBox: {
        flexDirection: "row",
        height: windowHeight * 0.17,
        width: windowWidth / 3,
        // width: windowWidth - scale(60),
        alignSelf: "center",
        // marginVertical: scale(10),
        borderRadius: scale(10),
        alignItems: "center",
        // shadowColor: colors.black,
        // shadowOffset: { height: 1, width: 1 },
        // shadowOpacity: 1,
        // shadowRadius: 1,
        // elevation: 1,
        //  overflow: "hidden",
        borderWidth:0.3
    },
    middleBox: {
        flexDirection: "row",
        height: windowHeight * 0.17,
        width: windowWidth / 2.2,
        alignSelf: "center",
        // marginVertical: scale(10),
        borderRadius: moderateScale(10)/fontScalingFactor,
        alignItems: "center",
        // shadowColor: colors.black,
        // shadowOffset: { height: 1, width: 1 },
        // shadowOpacity: 1,
        // shadowRadius: 1,
        // elevation: 1
        // , overflow: "hidden"
        borderWidth:0.3
    },
    clickHereBox: {
        flexDirection: "row", alignItems: "center",
    },
    upeerTextView: {
        position: "absolute", top: scale(8),
        width: "90%",
        height: scale(30),
        alignItems: "center",
        justifyContent: 'space-between',
        left: "5%",
        flexDirection: "row"
    },
    monitorBoxTitle: {
        fontSize: moderateScale(15)/fontScalingFactor,
        fontWeight: "500",
        color: colors.signUpBtn,
    }
})