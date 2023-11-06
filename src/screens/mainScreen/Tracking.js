import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowWidth } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../components/Images'
import NotesRating, { NotesReviewOfLastWesk } from '../../components/NotesRating'
import { deleteNotesById, deleteTrackingRecords, getUserNotes, getUserTrackingRecords, postUserNotes, postUserTrackingRecords, updatingNote, updatingTrackingRecords } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'
import { notesQuestions } from '../../utils/utils'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'

const Tracking = ({ route }) => {
    const routeData = route.params.data
    const goalsList = useSelector(state => state.main.userGoals)
    const token = useSelector(state => state.auth.accessToken)
    const [firstDropdownValue, setFirstDropdownValue] = useState(null);
    const [secondDropdownValue, setSecondDropdownValue] = useState(null);
    const [goalId, setGoalId] = useState(routeData?.goal_id);
    const [questionId, setQuestionId] = useState(routeData?.question_id);
    const [answer, setAnswer] = useState(routeData?.answer);
    const [previousWeekDescription, setPreviousWeekDescription] = useState(routeData?.previous_week_description);
    const [upperrating, setUpperrating] = useState(routeData?.weekly_rating)
    const [lowerrating, setLowerrating] = useState(routeData?.goal_rating)
    const [loader, setLoader] = useState(false)
    console.log(routeData,"routeDatarouteDatarouteDatarouteData");
    const dispatch = useDispatch()
    const navigation = useNavigation()
    console.log(token);
    const onPressSave = () => {
        
        if (questionId == "") {
          errorToast('Please select Question')
        } else if (answer.trim() == "") {
          errorToast('Please write the answer to Selected Question')
        } 
        else if (goalId == "") {
          errorToast('Please select a Goal first')
        }
        else if (previousWeekDescription.trim() == "") {
          errorToast('Please write the previous week description')
        }
        
        else {
          setLoader(true)
          var formdata = new FormData();
          formdata.append("question_id", questionId);
          formdata.append("answer", answer);
          formdata.append("weekly_rating", upperrating?upperrating:9);
          formdata.append("goal_id", goalId);
          formdata.append("goal_rating", lowerrating?lowerrating:9);
          formdata.append("previous_week_description", previousWeekDescription);
          dispatch(postUserTrackingRecords(token, formdata)).then(async(response) => {
            if (response.success == true) {
              setLoader(false)
              await dispatch(getUserTrackingRecords(token))
              successToast("Added Successfully")
            //   console.log(response, "NotesPostResponse");
            //   await dispatch(getUserNotes(token))
              navigation.goBack()
            } else {
              errorToast(response.error)
              setLoader(false)
            }
          })
        }
      }
    
      const updateRecords = () => {
        if (questionId == "") {
          errorToast('Please select Question')
        } else if (answer.trim() == "") {
          errorToast('Please write the answer to Selected Question')
        } 
        else if (goalId == "") {
          errorToast('Please select a Goal first')
        }
        else if (previousWeekDescription.trim() == "") {
          errorToast('Please write the previous week description')
        }
        else {
          setLoader(true)
          var objToSend = JSON.stringify({
            question_id:questionId,
            answer:answer,
            weekly_rating:upperrating,
            goal_id:goalId,
            goal_rating:lowerrating,
            previous_week_description:previousWeekDescription,
          })
          dispatch(updatingTrackingRecords(token, objToSend,routeData.id)).then(async(response) => {
            if (response.success == true) {
              setLoader(false)
              successToast("Updated Successfully")
              await dispatch(getUserTrackingRecords(token))
              navigation.goBack()
            } else {
              errorToast(response.error)
              setLoader(false)
            }
          })
        }
      }
      const deleteRecords = ()=>{
        if (route.params.noteStatus == "new") {
          navigation.goBack()
        }else{
          dispatch(deleteTrackingRecords(token,routeData.id)).then( async (res)=>{
            if (res.success == true) {
              await dispatch(getUserTrackingRecords(token)).then(async res=>{
                await console.log(res);
              })
              successToast(res.message)
              navigation.goBack()
            }
          }).catch(e=>{
            errorToast(e.message)
          })
        }
      }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent />}
            <ScrollView>
            <View style={styles.topBox}>
                    <Text
                    //  onPress={() => {
                    //     setModal1(true)
                    //     setOpen(true)
                    // }}
                     style={styles.topText}>Add or delete multiple
                        Fields according to
                        your Goals</Text>
                    <Image
                        source={images.goalsScreenImage}
                        style={styles.topImage}
                        resizeMode='stretch'
                    />
                </View>
                <NotesRating
                    value={firstDropdownValue}
                    onSetValue={(value) => setFirstDropdownValue(value)}
                    list={notesQuestions}
                    idOfSelectedItem={(id) => setQuestionId(id)}
                    rating={(r) => setUpperrating(r)}
                    onChangeValue={(text) => setAnswer(text)}
                    answer={answer}
                    questionId = {route.params.noteStatus == "new" ? "":routeData.question_id}
                    notesQuestionId={route.params?.noteStatus == "new" ? "" : routeData?.question_id}
                    ratingCount={routeData?.weekly_rating == null || routeData?.weekly_rating == false ? "9" : routeData?.weekly_rating}
                />
                <NotesReviewOfLastWesk
                    value={secondDropdownValue}
                    onSetValue={(value) => setSecondDropdownValue(value)}
                    list={goalsList}
                    idOfSelectedItem={(id) => setGoalId(id)}
                    rating={(r) => setLowerrating(r)}
                    onChangeValue={(t) => setPreviousWeekDescription(t)}
                    previousDescription={previousWeekDescription}
                    lastGoalId={route.params.noteStatus == "new" ? "" : routeData.goal_id == null ? "" : routeData.goal_id}
                    ratingCount={routeData?.goal_rating == null || routeData?.goal_rating == false ? "9" : routeData.goal_rating}
                />
                <View style={styles.del_save_Icon_Box}>
                    <TouchableOpacity style={styles.deleteNotesBox}
                        onPress={() => deleteRecords()}
                    >
                        <Image
                            source={images.trashIcon}
                            style={styles.trashIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveNotesBox}
                        onPress={() => {
                            route.params?.noteStatus == "new" ?
                                onPressSave() : updateRecords()
                        }}
                    >
                        <Image
                            source={images.saveNotes}
                            style={styles.saveNotes}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ height: scale(20) }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Tracking

const styles = StyleSheet.create({
    del_save_Icon_Box: {
        // backgroundColor: "grey",
        height: scale(50),
        width: windowWidth,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 78
    },
    trashIcon: {
        height: 35,
        width: 35,
        position: "absolute",
        right: scale(75)
    },
    saveNotes: {
        height: 50,
        width: 50,
        position: "absolute",
        right: scale(20)
    },
    deleteNotesBox: {
        height: scale(50),
        width: scale(50),
        position: "absolute",
        right: scale(90),
        alignItems: "center",
        justifyContent: "center"
    },
    saveNotes: {
        height: scale(50),
        width: scale(50)
    },
    saveNotesBox: {
        height: scale(50),
        width: scale(50),
        position: "absolute",
        right: scale(35),
    },
    trashIcon: {
        height: scale(35),
        width: scale(35),
    },
    topBox: {
        height: scale(200),
        width: windowWidth - scale(30),
        alignSelf: "center",
        marginTop: scale(20),
        padding: scale(10)
    },
    topText: {
        fontSize: moderateScale(18) / fontScalingFactor,
        fontWeight: "700",
        // fontFamily: "Plus Jakarta Sans",
        width: "50%",
        zIndex: 56,
        color: colors.signUpBtn,
        top: scale(20)
    },
    topImage: {
        position: "absolute",
        right: scale(10),
        top: scale(10),
        height: "100%",
        width: "60%"
    },
})