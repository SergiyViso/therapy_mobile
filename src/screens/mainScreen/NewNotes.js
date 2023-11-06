import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import { moderateScale, scale } from 'react-native-size-matters'
import { images } from '../../components/Images'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { colors } from '../../components/Colors'
import NotesRating, { NotesReviewOfLastWesk } from '../../components/NotesRating'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotesById, getUserNotes, postUserNotes, postUserTrackingRecords, updatingNote, updatingTrackingRecords, deleteTrackingRecords } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'
import { useNavigation } from '@react-navigation/native'
import { notesQuestions } from '../../utils/utils'
import CommonButtons from '../../components/CommonButtons'

const NewNotes = ({ route }) => {
  const routeData = route.params.data
  const goalsList = useSelector(state => state.main.userGoals)
  const token = useSelector(state => state.auth.accessToken)
  const richText = useRef();
  const richTextCoupon = useRef();
  const [firstDropdownValue, setFirstDropdownValue] = useState(null);
  const [secondDropdownValue, setSecondDropdownValue] = useState(null);
  const [goalId, setGoalId] = useState(routeData.tracking?.goal_id);
  const [questionId, setQuestionId] = useState(routeData?.tracking?.question_id);
  const [condition, setcondition] = useState('');
  const [notes, setNotes] = useState("Enter any thoughts, feelings or experiences you have during the week to talk about during therapy (or just to remind yourself). Consider writing any information that you might want to review in the future, such as discussions with family members, dreams you have, things you notice, etc.");
  const [answer, setAnswer] = useState(routeData?.tracking?.answer);
  const [previousWeekDescription, setPreviousWeekDescription] = useState(routeData?.tracking?.previous_week_description);
  const [upperrating, setUpperrating] = useState(routeData.tracking?.weekly_rating)
  const [lowerrating, setLowerrating] = useState(routeData.tracking?.goal_rating)
  const [loader, setLoader] = useState(false)
  const [title, setTitle] = useState("Today's Notes")
  console.log(goalId, "goalIdgoalIdgoalIdgoalId");
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // {alert(questionId)}
  // console.log(routeData,"routeDatarouteDatarouteData");
  const resetData = () => {
    setAnswer("")
    setTitle("")
    setNotes("")
    setQuestionId("")
    setGoalId("")
    setPreviousWeekDescription("")
  }
  // alert(goalId)
  const onPressSave = async () => {
    // if (title.trim() == '') {
    //   errorToast('Please enter Title')
    // } else if (notes.trim() == '') {
    //   errorToast('Please enter Description')
    // }
    // else
    //  if (questionId) {
    //   errorToast('Please select Question')
    // }
    //  else
      if (!answer || answer.trim() == '') {
      errorToast('Please write the answer to Selected Question')
    }
    else if (!previousWeekDescription) {
      errorToast('Please enter previous week description')
    }
    else if (goalId == undefined|| goalId == null||goalId == "") {
      errorToast('Please select goal to track')
    }



    else {
      // alert("run")
      setLoader(true)
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("description", notes);
      await dispatch(postUserNotes(token, formdata)).then(async (response) => {
        // alert(JSON.stringify(response))
        if (response.success == true) {
          // setLoader(false)
          // successToast("Added Successfully")
          // console.log(response, "NotesPostResponse");
          // resetData()
          // await dispatch(getUserNotes(token))
          // navigation.goBack()
          var data = new FormData();
          data.append("question_id", questionId);
          data.append("answer", answer);
          data.append("weekly_rating", upperrating ? upperrating : 9);
          data.append("goal_id", goalId);
          data.append("goal_rating", lowerrating ? lowerrating : 9);
          data.append("previous_week_description", previousWeekDescription);
          data.append("note_id", response.data);
          await dispatch(postUserTrackingRecords(token, data)).then(async (response) => {
            if (response.success == true) {
              setLoader(false)
              successToast("Added Successfully")
              //   console.log(response, "NotesPostResponse");
              //   await dispatch(getUserNotes(token))
              resetData()
              await dispatch(getUserNotes(token))
              navigation.goBack()
            } else {
              errorToast(response.error)
              setLoader(false)
            }
          })

        } else {
          errorToast(response.error)
          setLoader(false)
        }
      })
    }
  }
  //   useEffect(()=>{
  // var objToSend = JSON.stringify({
  //             question_id:questionId,
  //             answer:answer,
  //             weekly_rating:upperrating,
  //             goal_id:goalId,
  //             goal_rating:lowerrating,
  //             previous_week_description:previousWeekDescription,
  //             // note_id:routeData.tracking?.id
  //           })
  //           console.log(objToSend,"geqrgqeg");


  //   },[])
  // alert(routeData.tracking?.id)
  // var objToSend = JSON.stringify({
  //   question_id: questionId,
  //   answer: answer,
  //   weekly_rating: upperrating,
  //   goal_id: goalId,
  //   goal_rating: lowerrating,
  //   previous_week_description: previousWeekDescription,
  //   note_id: routeData.tracking?.note_id
  // })
  // console.log("goalIdgoalId", goalId);


  const updateNote = async () => {

    // if (title.trim() == '') {
    //   errorToast('Please enter Title')
    // } else if (notes.trim() == '') {
    //   errorToast('Please enter Description')
    // }
    // else 
    // if (!questionId) {
    //   errorToast('Please select Question')
    // } else 
    if (!answer || answer.trim() == '') {
      errorToast('Please write the answer to Selected Question')
    }
    else if (!previousWeekDescription) {
      errorToast('Please enter previous week description')
    }
    else if (goalId == undefined|| goalId == null||goalId == "") {
      errorToast('Please select goal to track')
    }
    else {
      setLoader(true)
      var objToSend = JSON.stringify({
        title: title,
        description: notes,
        // question_id:questionId,
        // answer:answer,
        // weekly_rating:upperrating,
        // goal_id:goalId,
        // goal_rating:lowerrating,
        // previous_week_description:previousWeekDescription,
      })
      await dispatch(updatingNote(token, objToSend, routeData.id)).then(async (response) => {
        if (response.success == true) {
          // setLoader(false)
          // successToast("Updated Successfully")
          // await dispatch(getUserNotes(token))
          // navigation.goBack()


          var objToSend = JSON.stringify({
            question_id: questionId,
            answer: answer,
            weekly_rating: upperrating,
            goal_id: goalId,
            goal_rating: lowerrating,
            previous_week_description: previousWeekDescription,
            note_id: routeData.tracking?.note_id
          })
          console.log("xfgnfgnfgnsgfnfgn", objToSend);
          dispatch(updatingTrackingRecords(token, objToSend, routeData.tracking?.id)).then(async (response) => {
            if (response.success == true) {
              setLoader(false)
              successToast("Updated Successfully")
              await dispatch(getUserNotes(token))
              navigation.goBack()
            } else {
              errorToast(response.error)
              setLoader(false)
            }
          }).catch(e => {
            console.log(e);
          })


        } else {
          errorToast(response.error)
          setLoader(false)
        }
      })
    }
  }
  // console.log(routeData.tracking?.id,"routeData.tracking?.id");
  const deleteRecords = () => {
    if (routeData.tracking?.id) {

      dispatch(deleteTrackingRecords(token, routeData.tracking?.id)).then(async (res) => {
        if (res.success == true) {
          deleteNotes()
          // successToast(res.message)
          // navigation.goBack()
        }
      }).catch(e => {
        errorToast(e.message)
      })

    } else {
      navigation.goBack()
    }
  }
  const deleteNotes = () => {
    if (route.params.noteStatus == "new") {
      navigation.goBack()
      resetData()
    } else {
      // alert(routeData.id)
      dispatch(deleteNotesById(token, routeData.id)).then(async (res) => {
        if (res.success == true) {
          successToast(res.message)
          await dispatch(getUserNotes(token)).then(res=>{
            console.log(JSON.stringify(res),"usernotessssss");
          })
          navigation.goBack()
          // deleteRecords()
        }
      }).catch(e => {
        errorToast(e.message)
      })
    }
  }

  const onTrackPress = ()=>{
navigation.navigate("TrackWeeklyRating")
  }
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <MainHeader backIcon />
      <ScrollView>
        {loader && <LoadingComponent />}
        <View style={styles.notesBox}>
          <Text style={styles.title}>{title}</Text>
          {/* <TextInput
            multiline
            value={title}
            onChangeText={(t) => setTitle(t)}
            style={styles.title}
            placeholder={`Today's Notes`}
            placeholderTextColor={colors.greyText}
          /> */}
          <Text style={styles.notes}>{notes}</Text>
          {/* <TextInput
            value={notes}
            multiline
            textAlignVertical='top'
            onChangeText={(t) => setNotes(t)}
            style={styles.notes}
            placeholderTextColor={colors.greyText}
            // placeholder='This is where your note will be. It’ll be housed here. You’ll save your note here. Type your memories here. Write down your thoughts.'
            placeholder='Enter any thoughts, feelings or experiences you have during the week to talk about during therapy (or just to remind yourself). Consider writing any information that you might want to review in the future, such as discussions with family members, dreams you have, things you notice, etc.'
          /> */}
        </View>
        <View style={{ marginTop: 20 }}>
          {/* <View
            style={{
              borderWidth: 1,
              borderColor: '#D3D3D3',
              backgroundColor: '#ffff',
              width: windowWidth - scale(40),
              alignSelf: "center"
            }}>
            <RichToolbar
              style={{ backgroundColor: '#fff', alignSelf: 'flex-start' }}
              editor={richTextCoupon}
              androidLayerType="software"
              androidHardwareAccelerationDisabled={true}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.insertOrderedList,
                actions.insertBulletsList,
                actions.insertLink,
              ]}
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              borderWidth: 1,
              borderColor: '#D3D3D3',
              backgroundColor: '#fff',
              minHeight: scale(100),
              width: windowWidth - scale(40),
              alignSelf: "center"
            }}>
            <RichEditor
              ref={richTextCoupon}
              androidLayerType="software"
              value={notes}
              androidHardwareAccelerationDisabled={true}
              onChange={descriptionText => {
                setcondition(descriptionText);
                console.log(descriptionText);
              }}
              style={{ height: 10 }}

            />
          </KeyboardAvoidingView> */}
        </View>
        <NotesRating
          value={firstDropdownValue}
          onSetValue={(value) => setFirstDropdownValue(value)}
          list={notesQuestions}
          idOfSelectedItem={(id) => setQuestionId(id)}
          rating={(r) => setUpperrating(r)}
          onChangeValue={(text) => setAnswer(text)}
          answer={answer}
          notesQuestionId={route.params.noteStatus == "new" ? "" : routeData.tracking?.question_id}
          ratingCount={routeData.tracking?.weekly_rating == null || routeData.tracking?.weekly_rating == false ? "9" : routeData.tracking?.weekly_rating}
          setUpperCount={(v)=>setUpperrating(v)}
        />
      
        <NotesReviewOfLastWesk
          value={secondDropdownValue}
          onSetValue={(value) => setSecondDropdownValue(value)}
          list={goalsList}
          idOfSelectedItem={(id) => setGoalId(id)}
          rating={(r) => setLowerrating(r)}
          onChangeValue={(t) => setPreviousWeekDescription(t)}
          previousDescription={previousWeekDescription}
          lastGoalId={route.params.noteStatus == "new" ? "" : routeData.tracking?.goal_id == null ? "" : routeData.tracking?.goal_id}
          ratingCount={routeData.tracking?.goal_rating == null || routeData.tracking?.goal_rating == false ? "9" : routeData.tracking?.goal_rating}
          setGoalId={(v) => setGoalId(v)}
          setLowerCount={(v)=>setLowerrating(v)}
          button
          handleTracking={()=>onTrackPress()}
        />
        {/* {alert(routeData.tracking?.goal_id)} */}
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
            onPress={() => { route.params.noteStatus == "new" ? onPressSave() : updateNote() }}
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

export default NewNotes

const styles = StyleSheet.create({
  title: {
    maxHeight: 80,
    fontSize: moderateScale(25) / fontScalingFactor,
    width: "95%",
    marginBottom: scale(10),
    color: colors.black,
    fontWeight:"600"

  },
  notes: {
    minHeight: 40,
    fontSize: moderateScale(12) / fontScalingFactor,
    width: "95%",
    maxHeight: windowHeight / 4,
    color: colors.black,
    fontWeight:"300"
    // backgroundColor: "red"
  },
  reviewText: {
    height: scale(100),
    fontSize: moderateScale(15) / fontScalingFactor,
    width: "100%",
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: colors.black,

  },
  notesBox: {
    width: windowWidth - scale(40),
    alignSelf: "center",
    marginTop: scale(30),
  },
  del_save_Icon_Box: {
    height: scale(50),
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(20)
  },
  trashIcon: { height: scale(35), width: scale(35), },
  saveNotesBox: { height: scale(50), width: scale(50), position: "absolute", right: scale(35), },
  deleteNotesBox: { height: scale(50), width: scale(50), position: "absolute", right: scale(90), alignItems: "center", justifyContent: "center" },
  saveNotes: { height: scale(50), width: scale(50) },
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
    fontSize: moderateScale(20) / fontScalingFactor,
    fontWeight: "600",
    // fontFamily: "Inter",
    marginVertical: scale(12)
  },
  bottomContentBox: {
    width: windowWidth - scale(70),
    alignSelf: "center",
    // backgroundColor: "#76767755"
  },


  dropdown: {
    height: scale(40),
    // borderColor: 'gray',
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
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

})