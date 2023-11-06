import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale } from 'react-native-size-matters'
import CommonButtons from '../../components/CommonButtons'
import { images } from '../../components/Images'
import { colors } from '../../components/Colors'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { notesQuestions } from '../../utils/utils'
import { getUserTrackingRecords } from '../../../redux/actions/mainAction'

const TrackingRecords = () => {
    const questions = notesQuestions
    const notesList = useSelector(state => state.main.trackingRecords)
    const token = useSelector(state => state.auth.accessToken)
    const [notesData, setNotesData] = useState(notesList)
    const [search, setSearch] = useState("")
    console.log(notesList, "notesListnotesListnotesListnotesList");
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    
    useEffect(()=>{
         dispatch(getUserTrackingRecords(token)).then(async res=>{
            setNotesData(res.data)
         })
    },[isFocused])
    useEffect(() => {
        if (notesList.length != 0) {
          const sorted = notesList.sort((a, b) => {
            const dateA = new Date(`${a.created_at}`).valueOf();
            const dateB = new Date(`${b.created_at}`).valueOf();
            if (dateB > dateA) {
              return 1; // return -1 here for DESC order
            }
            return -1 // return 1 here for DESC Order
          });
          setNotesData(sorted)
        }
      }, [notesList])

    const editNotes = async (item) => {
        navigation.navigate("Tracking", {
            data: item, noteStatus: "updating"
        })
    }

    const handleCreateNewNote = () => {
        navigation.navigate("Tracking", {
            data: {
                goal_id: "",
                goal_rating: "9",
                previous_week_description: "",
                question_id: "",
                weekly_rating: "9",
                answer: "",
            },
            noteStatus: "new"
        })
    }

    const getQuestion = (id) => {
        let ques = ''
        questions.map((el, index) => {
            if (el.id == id) {
                ques=el.title
            }
        })
        return ques
    }

    const renderList = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => editNotes(item)} style={styles.newNotes2}>
                <Text numberOfLines={1} style={styles.date}>{getQuestion(item.question_id)}</Text>
                <Text numberOfLines={2} style={styles.notes}>{item.answer}</Text>
                <View style={styles.itemTimeBox}>
                    <Text style={styles.time}>{moment(item.created_at).format("hh:mm a")}</Text>
                    <Image
                        style={styles.redRightArrow}
                        source={images.redRightArrow}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Tracking</Text>
                    {/* <Text style={styles.title}>Symptom Tracking</Text> */}
                    <CommonButtons
                        onPress={handleCreateNewNote}
                        title={"Add"} customStyle={{ height: scale(35) }} leftIcon={images.plusIcon} />
                </View>
                <View style={styles.searchBox}>
                    <View style={styles.inputBox}>
                        <Image
                            source={images.search}
                            style={styles.menu}
                            resizeMode="contain"
                        />
                        <TextInput
                            value={search}
                            onChangeText={(t) => setSearch(t)}
                            placeholder='Search'
                            placeholderTextColor={colors.signUpBtn}
                            style={styles.input}
                            
                        />
                    </View>
                    <View style={styles.sortBox}>
                        <Text style={styles.sortText}>Sort:</Text>
                        <Image
                            style={styles.sortIcon}
                            source={images.sortIcon}
                        />
                    </View>
                </View>
                <View style={styles.notesBox}>

                    <FlatList
                        data={notesData}
                        renderItem={renderList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TrackingRecords

const styles = StyleSheet.create({
    contentBox: {
        width: windowWidth - scale(50),
        alignSelf: "center",
    },
    titleBox: {
        height: scale(50),
        marginVertical: scale(10),
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    title: {
        fontSize: moderateScale(15) / fontScalingFactor,
        fontWeight: "700",
        fontFamily: "Inter",
        marginVertical: scale(12),
        color: colors.signUpBtn
    },
    searchBox: {
        height: scale(40),
        width: "100%", alignSelf: "center",
        // backgroundColor: "red",
        flexDirection: "row"
    },
    inputBox: {
        height: scale(40),
        width: "100%", alignSelf: "center",
        flexDirection: "row",
        width: "75%",
        alignItems: "center",
        borderWidth: Platform.OS == 'ios' ? scale(0.8) : scale(0.2),
        borderRadius: scale(4),
        borderColor: colors.greyText,
    },
    menu: {
        height: scale(16),
        width: scale(16),
        marginLeft: scale(10)
    },
    input: {
        height: "100%",
        width: "80%",
        paddingLeft: 15,
        fontSize: moderateScale(13) / fontScalingFactor,
        color:colors.signUpBtn,
        fontWeight:"300"
    },
    sortBox: {
        width: "25%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        paddingHorizontal: "2%"
    },
    sortText: {
        fontSize: scale(11),
        color: colors.greyText,
        fontWeight: "500"
    },
    sortIcon: {
        height: "55%",
        width: scale(20)
    },
    newNotes2: {
        height: scale(100),
        width: "98%",
        borderRadius: 2,
        // borderColor: colors.buttonColor,
        borderWidth: 0.1,
        justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: "1%",
        marginVertical: "2%",
        padding: 6,
        backgroundColor: "#f9f9f9",
        // overflow:"hidden"

    },
    notesBox: {
        maxHeight: windowHeight - scale(190),
        // backgroundColor:"grey",
        overflow: "hidden"
    },
    notesBox2: {
        // backgroundColor: "grey",
        width: windowWidth - scale(20),
        paddingHorizontal: scale(15),
        marginTop: scale(15), flexDirection: "row",
        // maxHeight: windowHeight / 1.6,
        flexWrap: "wrap",
        alignItems: "center",
        alignSelf: "center",
    },
    date: {
        fontSize: moderateScale(14) / fontScalingFactor,
        color: colors.signUpBtn,
        fontWeight: "500"
    },
    time: {
        fontSize: moderateScale(11) / fontScalingFactor,
        color: colors.time,
        fontWeight: "400"
    },
    notes: {
        fontSize: moderateScale(10) / fontScalingFactor,
        color: colors.notes,
        fontWeight: "400",
        paddingVertical: scale(6)
    },
    itemTimeBox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    redRightArrow: {
        height: scale(15),
        width: scale(15),
    }
})