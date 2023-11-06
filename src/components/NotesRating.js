import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { notesDropdownList, notesQuestions, previousWeakRatingList, ratingList } from '../utils/utils';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { images } from './Images';
import { colors } from './Colors';
import { errorToast, fontScalingFactor, windowHeight, windowWidth } from './CommonStyles';
import DropDownComponent from './DropDownComponent';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import CommonButtons from './CommonButtons';

const NotesRating = ({ value, onSetValue = (value) => { }, list,
    idOfSelectedItem = (id) => { }, rating = (r) => { }
    , onChangeValue = (t) => { }, editMode, answer, ratingCount, notesQuestionId, questionId, setUpperCount = (v) => { } }) => {

    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [newUpperRating, setNewUpperRatting] = useState(ratingList);
    const [enteringText, setEnteringText] = useState(answer);
    const [weeklyRating, setWeeklyRating] = useState('');
    useEffect(() => {
        if (editMode) {
            setEnteringText(editMode)
        }

    }, [])
    const handleRatting = (item, index) => {
        let newArr = [...ratingList]
        newArr.map((item, ind) => {
            index == ind ? item.isSelected = true : item.isSelected = false
            return { ...item }
        })
        setNewUpperRatting(newArr)
        rating(item.num);
    }
    useEffect(() => {
        firstRatting()
    }, [])
    const firstRatting = () => {
        // alert(ratingCount)
        let newArr = [...ratingList]
        newArr.map((item, ind) => {
            ind == parseInt(ratingCount - 1) ? item.isSelected = true : item.isSelected = false
            rating(item.num);
        })
        setNewUpperRatting(newArr)
        setUpperCount(ratingCount)
        // alert(ratingCount)
    }
    // useEffect(() => {
    //     if (notesQuestionId != "") {
    //         // alert(notesQuestionId)
    //         let question = ""
    //         question = notesQuestions.filter((item, index) => {
    //             return index == notesQuestionId
    //         })

    //     }
    // }, [])
    useEffect(() => {
        if (notesQuestionId) {
            // alert(notesQuestionId)
            let value = notesQuestions.filter(el => {
                return el.id == notesQuestionId

            })
            onSetValue(value[0].title)
            console.log(value, "yutryutyuuyuy");
        }
    }, [])
    return (
        <View style={styles.bottomContentBox}>
            <Text style={styles.dropDownTitle}>Select a Question to Write About</Text>
            <DropDownComponent
                value={value}
                onSetValue={(item) => {
                    onSetValue(item)
                    setWeeklyRating(item)
                }}
                customStyle={{ width: windowWidth - scale(70) }}
                listToRender={list}
                placeholder='What I feel proud of this week!'
                idOfSelectedItem={(id) => idOfSelectedItem(id)}
            />
            <Text style={styles.dropDownTitle}>Enter your text here *</Text>
            <TextInput
                value={enteringText}
                multiline
                onChangeText={(t) => {
                    onChangeValue(t)
                    setEnteringText(t)
                }}
                style={styles.reviewText}
                textAlignVertical={'top'}
            />
            <Text style={styles.dropDownTitle}>Weekly Rating</Text>
            <Text style={[styles.dropDownTitle, {
                color: colors.greyText, fontSize: moderateScale(13) / fontScalingFactor, marginTop: scale(-10),
                fontWeight: "400",
            }]}>
                Pick a number to rate your past week,
                with 10 being the best ever and 1 being the worst.</Text>
            <View style={styles.ratingBox}>
                <View style={[styles.ratingLine]}></View>
                {
                    newUpperRating.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => handleRatting(item, index)} style={styles.ratingData}>

                                <Image
                                    source={item.isSelected ? images.selectedRating : images.ratingCircle}
                                    style={{ height: scale(15), width: scale(15) }}
                                    resizeMode='stretch'
                                />
                                <Text>{item.num}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}
export default NotesRating



export const NotesReviewOfLastWesk = ({ value, onSetValue = (item) => { },
    list, idOfSelectedItem = (id) => { }, rating = (r) => { },
    onChangeValue = (t) => { }, previousDescription, ratingCount, lastGoalId, setGoalId = (v) => { }, setLowerCount = (v) => { },
handleTracking=()=>{ } }) => {
    const goalsList = useSelector(state => state.main.userGoals)
    const [enteringText, setEnteringText] = useState(previousDescription);
    const [goalToTrack, setGoalToTrack] = useState(lastGoalId)
    const [newLowerRating, setNewLowerRatting] = useState(previousWeakRatingList);
    const [isFocus, setIsFocus] = useState(false);
   
    useEffect(() => {
        if (lastGoalId != "") {
            if (lastGoalId != null) {
                // alert(lastGoalId)
                console.log(lastGoalId, "gafadjkssaglkasgdajksgkjasgsakjn");
                let goalId = ""
                goalId = goalsList.filter((item, index) => {
                    return item.id == lastGoalId
                })
                onSetValue(goalId[0]?.title)
                setGoalId(goalId[0].id)
            }
            else {
                onSetValue("")
            }
        }
    }, [])

    const handleRatting = (item, index) => {
        if (goalToTrack.length == 0) {
            errorToast("Please select a Goal first")
        } else {
            let newArr = [...previousWeakRatingList]
            newArr.map((item, ind) => {
                index == ind ? item.isSelected = true : item.isSelected = false
            })
            setNewLowerRatting(newArr)
            rating(item.num)
        }
    }
    useEffect(() => {
        firstRatting()
    }, [])

    const firstRatting = () => {
        //    alert(ratingCount)
        let newArr = [...previousWeakRatingList]
        newArr.map((item, ind) => {
            ind == parseInt(ratingCount - 1) ? item.isSelected = true : item.isSelected = false
            rating(item.num);
        })
        setNewLowerRatting(newArr)
        setLowerCount(ratingCount)
        // alert(ratingCount)
    }
    return (
        <View style={styles.bottomContentBox}>
            <Text style={styles.dropDownTitle}>Enter a word to describe your previous week:</Text>
            <TextInput
                value={enteringText}
                multiline
                onChangeText={(t) => {
                    onChangeValue(t)
                    setEnteringText(t)
                }}
                style={styles.reviewText}
                textAlignVertical={'top'}
            />
              {/* <CommonButtons title={'Track your weekly rating'} customStyle={styles.btnStyle}
                                 onPress={() => handleTracking()}
                                /> */}
            {/* <Image
                source={images.notesScreenImage}
                style={{ height: scale(200), width: "100%" }}
                resizeMode='contain'
            /> */}
            <Text style={styles.dropDownTitle}>Select a goal to track</Text>
            <DropDownComponent
                value={value}
                onSetValue={(item) => {
                    onSetValue(item)
                    setGoalToTrack(item)
                }}
                customStyle={{ width: windowWidth - scale(70) }}
                listToRender={list}
                placeholder='Improve my self-esteem'
                idOfSelectedItem={(id) => idOfSelectedItem(id)}
            />
            <Text style={styles.dropDownTitle}>Rating</Text>
            <Text style={[styles.dropDownTitle, {
                color: colors.greyText, fontSize: moderateScale(13) / fontScalingFactor, marginTop: scale(-10),
                fontWeight: "400",
            }]}>
                Pick a number between 1 and 10 to denote where you are in relation to achieving your goal.
                For reference, 1 would be used for the day you set your goal here,
                and 10 would mean you have achieved it.</Text>
            <View style={styles.ratingBox}>
                <View style={[styles.ratingLine]}></View>
                {
                    newLowerRating.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => handleRatting(item, index)} style={styles.ratingData}>
                                <Image
                                    source={item.isSelected ? images.selectedRating : images.ratingCircle}
                                    style={{ height: scale(15), width: scale(15) }}
                                    resizeMode='stretch'
                                />
                                <Text>{item.num}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Text style={styles.lowSev}>Getting Started</Text>
            <Text style={styles.highSev}>At Goal</Text>
            <View style={{ height: scale(20) }}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    lowSev:{
        position:"absolute",bottom:verticalScale(4),left:5,color:colors.signUpBtn,fontSize:moderateScale(9)/fontScalingFactor
    },
    highSev:{
        position:"absolute",bottom:verticalScale(4),right:5,color:colors.signUpBtn,fontSize:moderateScale(9)/fontScalingFactor
    },
    reviewText: {
        height: scale(100),
        fontSize: moderateScale(12) / fontScalingFactor,
        width: "100%",
        borderRadius: scale(10),
        borderWidth: 0.6,
        borderColor: colors.greyText,
        padding: moderateScale(10) / fontScalingFactor,
        color: colors.black

    },
    notesBox: {
        // height: windowHeight / 1.6,
        width: windowWidth - scale(40),
        alignSelf: "center",
        marginTop: scale(30),
        // backgroundColor:"red"
    },
    del_save_Icon_Box: {
        position: "absolute",
        bottom: scale(80),
        // backgroundColor: "grey",
        height: 50,
        width: windowWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    trashIcon: { height: 35, width: 35, position: "absolute", right: scale(75) },
    saveNotes: { height: 50, width: 50, position: "absolute", right: scale(20) },
    textNormal: (size, color, weight, customStyles) => {
        return {
            fontSize: size,
            // fontFamily: 'Poppins-Regular',
            color: color,
            fontWeight: weight,
            ...customStyles
        }
    },
    dropDownTitle: {
        fontSize: moderateScale(16) / fontScalingFactor,
        fontWeight: "600",
        // fontFamily: "Inter",
        marginVertical: scale(12),
        color: colors.black
    },
    bottomContentBox: {
        width: windowWidth - scale(70),
        alignSelf: "center",
    },

    dropdown: {
        height: scale(40),
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: scale(10)
    },
    icon: {
        marginRight: 5,
        height: scale(8),
        width: scale(12)
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: moderateScale(12) / fontScalingFactor,
    },
    placeholderStyle: {
        fontSize: moderateScale(12) / fontScalingFactor,
    },
    selectedTextStyle: {
        fontSize: moderateScale(12) / fontScalingFactor,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    ratingData: { height: "100%", width: "9%", marginRight: "1%", alignItems: "center", justifyContent: "center" },
    ratingBox: { height: scale(40), width: "100%", backgroundColor: "white", flexDirection: "row" },
    ratingLine: { height: 1, width: "90%", backgroundColor: "lightgrey", position: "absolute", zIndex: -2, top: scale(12.2), left: "5%" },
    btnStyle:{
        height:verticalScale(40),width:"80%",marginTop:verticalScale(10),alignSelf:"flex-end"
    }
})