import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { commonStyles, errorToast, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import StatusBarComponent from '../../components/StatusBarComponent'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { notesData } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { getUserNotes, getUserNotesById } from '../../../redux/actions/mainAction'
import LoadingComponent from '../../components/LoadingComponent'


const IndividualTherapy = (props) => {
    const isFocused = useIsFocused()
    const notesList = useSelector(state => state.main.userNotesList)
    const goalsList = useSelector(state => state.main.userGoals)
    const token = useSelector(state => state.auth.accessToken)
    const [notesData, setNotesData] = useState(notesList)
    const[filterdData,setFilteredData]= useState(notesList)
    const [search, setSearch] = useState("")
    const [loader, setLoader] = useState("")
    const navigation = useNavigation()
    const dispatch = useDispatch()
   
    const editNotes = async (item) => {
        if (goalsList.length == 0) {
            errorToast("You have to add a goal first")
        } else {
            navigation.navigate("NewNotes", {
                data: item, noteStatus: "updating"
            })
            console.log(item, "itemmmmmm we have ");
        }
    }


    const handleCreateNewNote = () => {
        // if (goalsList.length == 0) {
        //     errorToast("You have to add a goal first")
        // } else {

            props.navigation.navigate("NewNotes", {
                data: {
                    title: "",
                    description: "",
                    tracking:{

                        goal_id: "",
                        goal_rating: "9",
                        previous_week_description: "",
                        question_id: 0,
                        weekly_rating: "9",
                        answer: "",
                    }

                },
                noteStatus: "new"
            })
        // }
    }
    useEffect(() => {
        if (notesData.length != 0) {
      
            const sorted = notesData.sort((a, b) => {
                const dateA = new Date(`${a.created_at}`).valueOf();
                const dateB = new Date(`${b.created_at}`).valueOf();
                if (dateB > dateA) {
                    return 1; // return -1 here for DESC order
                }
                return -1 // return 1 here for DESC Order
            });
            setNotesData(sorted)
            setFilteredData(sorted)
        }
    }, [notesData,isFocused])
    const handleFilterChange = (text) => {
        setSearch(text);
       setFilteredData(notesData.filter((i)=> i.tracking.answer.toLowerCase().includes(text.toLowerCase())))

 };
    // console.log(JSON.stringify(notesData),"dxkjgkjdghksdgkjsgkjsgs");
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent />}
                <View style={{ height:Platform.isPad? windowHeight - verticalScale(150): windowHeight - verticalScale(80) }}>
            <ScrollView>
                    <Text style={styles.screenTitle}>Therapy Notes</Text>
                    <Text style={styles.screenHeading}>This is where you will enter your notes to discuss in therapy. Think of something important? Remember something meaningful during the course of the week? Put it here.</Text>
                    <Text style={[styles.screenHeading, { marginTop: scale(8) }]}>Don't feel the need to be neat, orderly and organized. Any information is helpful, even if it's just a word or a phrase that will jog your memory come session time.</Text>
                    <View style={styles.searchBox}>
                        <View style={styles.inputBox}>
                            <Image
                                source={images.search}
                                style={styles.menu}
                                resizeMode="contain"
                            />
                            <TextInput
                                value={search}
                                onChangeText={(t) => handleFilterChange(t)}
                                placeholder='Search'
                                style={styles.input}
                                placeholderTextColor={colors.signUpBtn}
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
                        <View style={styles.notesBox2}>
                            <TouchableOpacity activeOpacity={0.6} style={styles.newNotes}
                                onPress={() => handleCreateNewNote()}
                            >
                                <Image
                                    source={images.roundPlus}
                                    style={styles.notesImage}
                                    resizeMode='stretch'
                                />
                                <Text style={{ color: colors.buttonColor, fontSize: moderateScale(14) / fontScalingFactor }}>New note</Text>
                            </TouchableOpacity>


                            {notesData.length > 0 &&
                                filterdData.map((item, index) => {
                                    console.log("item inside the titak",item.tracking?.answer)
                                    return (
                                        // <>
                                        <TouchableOpacity onPress={() => editNotes(item)} style={styles.newNotes2}>
                                            <Text style={styles.date}>{moment(item.created_at).format("dddd, MMM Do, YYYY")}</Text>
                                            <Text numberOfLines={1} style={styles.notes}>{item.tracking?.answer}</Text>
                                            <View style={styles.itemTimeBox}>
                                                <Text style={styles.time}>{moment(item.created_at).format("hh:mm a")}</Text>
                                                <Image
                                                    style={styles.redRightArrow}
                                                    source={images.redRightArrow}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        
                                    )
                                })
                            }
                        </View>
                    </View>
            </ScrollView>
                </View>
        </SafeAreaView>
    )
}

export default IndividualTherapy

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: moderateScale(25) / fontScalingFactor,
        alignSelf: "center",
        fontWeight: "700",
        color: colors.signUpBtn, marginVertical: scale(10)
    },
    screenHeading: {
        // fontSize: moderateScale(17) / fontScalingFactor,
        alignSelf: "center",
        // fontWeight: "400",
        // color: colors.signUpBtn, 
        marginHorizontal: 20,
        color: colors.black,
        fontSize: moderateScale(12) / fontScalingFactor,
        fontWeight: "300",
    },

    searchBox: {
        height: scale(40),
        width: windowWidth - scale(40), alignSelf: "center",
        // backgroundColor: "red",
        flexDirection: "row",
        marginTop: 20
    },
    inputBox: {
        height: scale(40),
        width: windowWidth - scale(40), alignSelf: "center",
        flexDirection: "row",
        width: "75%",
        alignItems: "center",
        borderWidth: Platform.OS == 'ios' ? scale(0.8) : scale(0.2),
        borderRadius: scale(4),
        borderColor: colors.greyText,
    },
    menu: {
        height: 20,
        width: 20,
        marginLeft: scale(10)
    },
    input: {
        height: "100%",
        width: "80%",
        paddingLeft: 15,
        fontSize: moderateScale(13) / fontScalingFactor,
        color:colors.black
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
    notesImage: {
        height: scale(40),
        width: scale(40)
    },
    newNotes: {
        height: scale(100),
        width: windowWidth / 3.9,
        borderRadius: 10,
        borderColor: colors.buttonColor,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "1%",
        marginVertical: "2%",
        justifyContent: "space-evenly"

    },
    newNotes2: {
        height: scale(100),
        width: windowWidth / 3.9,
        borderRadius: 2,
        // borderColor: colors.buttonColor,
        borderWidth: 0.1,
        justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: "1%",
        marginVertical: "2%",
        padding: 6,
        backgroundColor: "#f9f9f9"

    },
    notesBox: {
        // maxHeight: windowHeight - scale(190),
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
        // height: windowHeight / 1.80
    },
    date: {
        fontSize: moderateScale(11) / fontScalingFactor,
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