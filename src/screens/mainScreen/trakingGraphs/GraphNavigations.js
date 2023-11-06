import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MainHeader from '../../../components/MainHeader'
import { images } from '../../../components/Images'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../../components/CommonStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../../components/Colors'
import CommonButtons from '../../../components/CommonButtons'
import TextInputComponent from '../../../components/TextInputComponent'

const GraphNavigations = (props) => {
    const [wordOfWeek, setWordOfWeek] = useState('')
    const data = [
        { id: 0, btnTitle: "Symptoms records" },
        { id: 1, btnTitle: "Goals records" },
        { id: 3, btnTitle: "Weekly records" }
    ]
    const handleButtons = (item, index) => {
        if (index == 0) {
            props.navigation.navigate("SymptomsGraph")
        } else if (index == 2){
            props.navigation.navigate("TrackWeeklyRating")
        }else{
            
            props.navigation.navigate("GoalsGraph")

        }
    }
    const renderButtons = ({ item, index }) => {
        return (
            
            <CommonButtons title={item.btnTitle} customStyle={{ width: windowWidth / 2.5, margin: scale(7), height: verticalScale(40) }}
                customText={{ fontSize: moderateScale(13) / fontScalingFactor }}
                onPress={() => handleButtons(item, index)}
            />
        )
    }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon={images.backIcon} />
            <View style={styles.mainBox}>
                <Text style={styles.screenTitle}>Tracking Records</Text>
                <Text style={styles.calenderheadline}>Continue tracking your daily updates.By pressing the buttons below you can track your goals, symptoms and your weekly rating.</Text>
                <FlatList
                    data={data}
                    renderItem={renderButtons}
                    numColumns={2}

                />
            </View>
            <View style={styles.greyLine}></View>
            <View style={styles.mainBox}>
                <Text style={styles.title}>Word of the week.</Text>
                <Text style={styles.calenderheadline}>Here you can add your word of the week.</Text>
                <TextInput
                    value={wordOfWeek}
                    onChangeText={(t) => setWordOfWeek(t)}
                    placeholder=''
                    style={styles.input}
                />
                <CommonButtons title={"Add"} customStyle={{ width: "90%", margin: scale(7), height: verticalScale(40), alignSelf: "center", backgroundColor: colors.signUpBtn }}
                    customText={{ fontSize: moderateScale(15) / fontScalingFactor }}
                    // onPress={() => handleButtons(item, index)}
                />
            </View>
        </SafeAreaView>
    )
}

export default GraphNavigations

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: moderateScale(20) / fontScalingFactor,
        // alignSelf: 'center',
        fontWeight: '600',
        color: colors.signUpBtn,
        paddingVertical: verticalScale(10)

    },
    calenderheadline: {
        // fontSize: moderateScale(15) / fontScalingFactor,
        // fontWeight: "400",
        // color: colors.signUpBtn,

        color: colors.black,
        fontSize: moderateScale(12) / fontScalingFactor,
        fontWeight: "300",

    },
    mainBox: {
        width: windowWidth,

        paddingHorizontal: scale(20),
        // flexDirection: "row",

    },
    greyLine: {
        height: 1,
        width: windowWidth,
        backgroundColor: colors.greyText,
        alignSelf: "center",
        marginTop: scale(20)
    },
    title: {
        fontSize: moderateScale(16) / fontScalingFactor,
        // alignSelf: 'center',
        fontWeight: '500',
        color: colors.signUpBtn,
        paddingVertical: verticalScale(10)

    },
    input: {
        height: scale(35),
        borderRadius: scale(10),
        borderWidth: 0.8, borderColor: colors.greyText,
        width: windowWidth - scale(50),
        alignSelf: "center",
        padding: scale(10),
        marginTop: 5,
        color: colors.black
    },
})