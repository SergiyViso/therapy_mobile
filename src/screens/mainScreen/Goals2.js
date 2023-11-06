import { FlatList, Image, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import CommonButtons from '../../components/CommonButtons'
import { previousWeakRatingList, dummyData, SymptomsList } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { addingGoals, addingSymptoms, getSymptomToTrack, getUserGoals, getUserSymptoms, PostGoalsDetail, PostSymptomsDetail } from '../../../redux/actions/mainAction'
import * as RNLocalize from "react-native-localize";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useEffect } from 'react'
import LoadingComponent from '../../components/LoadingComponent'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
const Goals2 = () => {
    const token = useSelector(state => state.auth.accessToken)
    const adminSymptoms = useSelector(state => state.auth.adminSymptoms)
    const symptomList = useSelector(state => state.main.userGoals)
    const [ratingToSend, setRatingToSend] = useState("9")
    const [addGoal, setAddGoal] = useState("")
    const [text, setText] = useState("")
    const [comment, setComment] = useState("")
    const [timeZone, setTimeZone] = useState("")
    const [commentIndex, setCommentIndex] = useState("")
    const [commentInput, setCommentInput] = useState(false)
    const [selecting, setSelecting] = useState(false)
    const [selectSymptom, setSelectSymptom] = useState(false)
    const [loader, setLoader] = useState(false);
    const [arrToSend, setArrToSend] = useState([])
    const [symptomsFromApi, setSymptomsFromApi] = useState([])
    const [symptomNewArr, setSymptomNewArr] = useState(symptomList)
    const [selectedSymptom, setSelectedSymptom] = useState("general anxiety")
    const [newLowerRating, setNewLowerRatting] = useState(previousWeakRatingList);
    const [rating, setRating] = useState(previousWeakRatingList);
    const dispatch = useDispatch()
    console.log(JSON.stringify(arrToSend), "adminSymptomsadminSymptomsadminSymptoms");
    const isFocused = useIsFocused()
    useEffect(() => {
        let timeZone = RNLocalize.getTimeZone()
        setTimeZone(timeZone)
        settingSymptomArr()
    }, [symptomNewArr])
    useEffect(() => {
        resetFunction()
    }, [isFocused])
    const resetFunction = () => {
        setSelectedSymptom('general anxiety')
        setSelecting(false)
        setSelectSymptom('')
        resetMultipleSelect()
        setArrToSend([])
    }

    async function settingSymptomArr() {
        if (symptomNewArr.length != 0) {

            let value = await symptomNewArr.map(el => { return el.title })
            // console.log('====================================');
            // console.log(value);
            // console.log('====================================');
            setSymptomsFromApi(value)
        }
    }

    // alert(commentIndex)
    const handleRatting = async (item, index, dotIndex) => {
        // alert(index)
        // if (arrToSend.length == 0) {
        setCommentInput(true)
        let ratingArr = newLowerRating
        ratingArr.map((itemm, indexx) => {
            indexx == dotIndex ? itemm.isSelected = true : itemm.isSelected = false
            return { ...itemm }
        })
        setNewLowerRatting(ratingArr)
        // console.log(ratingArr[dotIndex], "ghkjhjhkhkhkjhk");

        let arr = [...symptomNewArr]
        await arr.map((el, ind) => {
            index == ind ? (el.data = ratingArr) : (el.data = rating)
            return { ...el }
        })
        // alert(arr[index].id,+"kjgkkjkj")
        // console.log(JSON.stringify(arr), "llkkjlkjlljkllklkklkkljlklkj");
        setCommentIndex(arr[index].id)
        setSymptomNewArr(arr)
        console.log(arr[index].title, "title");
        let title = arr[index].title
        let ratingg = arr[index].data[dotIndex].num
        console.log(arr[index].data[dotIndex].num, "ratingg");
        if (arrToSend.length != 0) {
            let dataa = await arrToSend.filter((el, ind) => {
                return el.id == arr[index].id
            })
            arrToSend.push({ title: title, rating: ratingg, id: arr[index].id, comment: dataa[0]?.comment ? dataa[0]?.comment : "" })
            if (dataa[0]?.comment) {
                setComment(dataa[0]?.comment)
            } else {
                setComment('')
            }
        } else {
            arrToSend.push({ title: title, rating: ratingg, id: arr[index].id, comment: "" })


        }
        removeDuplicates()

        // }else{
        //     errorToast("You can add one Symptom")
        // }
    }
    // console.log(JSON.stringify(arrToSend), "jkjkkjkjkjjk");
    const handleSymptomComments = () => {
        if (comment.trim() == '') {
            errorToast("Please enter comment to add ")
        } else {

            let arr = [...arrToSend]
            arr.map((el, ind) => {
                el.id == commentIndex ? el.comment = comment : el.comment = el.comment
                return { ...el }
            })
            setArrToSend(arr)
            setCommentInput(false)
            setComment("")
        }
    }
    function removeDuplicates() {
        let books = arrToSend
        console.log(books);
        let newArray = [];
        let uniqueObject = {};
        for (let i in books) {
            let objTitle = books[i]['title'];
            uniqueObject[objTitle] = books[i];
        }
        for (let i in uniqueObject) {
            newArray.push(uniqueObject[i]);
        }
        console.log(newArray, "unique arrrrayyyyyyy");
        setArrToSend(newArray)
    }

    const postSymptom = (symptom) => {
        dispatch(addingSymptoms(symptom, token)).then(async res => {
            console.log(res, "adding Symptom");
            if (res.success == true) {
                successToast(res.message)
                if (text.trim() != "") {
                    setSelectedSymptom("general anxiety")

                }
                setText("")
                await dispatch(getUserSymptoms(token)).then(async res => {
                    if (res.success == true) {
                        setSymptomNewArr(res.data)
                    }
                })
            }
        }).catch((e) => {
            console.log(e, "error while adding Symptom");
        })
    }
    const addSymptom = () => {
        if (symptomsFromApi.includes(selectedSymptom)) {
            errorToast("Symptom Already Added")
        } else {
            // alert(selectedSymptom)
            if (selectedSymptom == "other") {
                if (text.trim() == "") {
                    errorToast("Please enter Symptom")
                } else {
                    const includesString = symptomNewArr.some(obj => {
                        return Object.values(obj).some(value => {
                            if (typeof value === 'string') {
                                return value.includes(text.trim());
                            }
                            return false;
                        });
                    });
                    // const includesString = symptomNewArr.some(obj => {
                    //     return Object.keys(obj).some(key => {
                    //       return obj[key].includes(text);
                    //     });
                    //   });

                    if (includesString) {
                        errorToast("Already Added")
                    } else {
                        console.log('The key in the array of objects does not include the specified string.');
                        postSymptom(text)
                    }

                }
            } else {
                postSymptom(selectedSymptom)

            }
        }
    }
    const addGoalsByRating =async() => {
        if (arrToSend.length == 0) {
            errorToast("Please add atleast one goal")
        }
        else {
        //    await arrToSend.map((el) => {
        //         delete el["comment"]
                
        //     })
            var formdata = new FormData()
            formdata.append("rating", ratingToSend),
                formdata.append("timezone", timeZone),
                arrToSend.forEach(element => {
                    formdata.append(`goal_id[${element.id}]`, element.rating)
                    formdata.append(`comments[${element.id}]`, element.comment)
                });
            console.log(formdata, "dxfdsfdfsgdfgdgdsgsdggsgsdgsdsg");
            setLoader(true)
            dispatch(PostGoalsDetail(token, formdata)).then(async res => {
                console.log(res, "response of posting symptom tracking!!!!!!!");
                if (res.success == true) {
                    // await dispatch(getSymptomToTrack(token)).then(res=>{
                    //     console.log(JSON.stringify(res));
                    // })
                    successToast(res.message)
                    setArrToSend([])
                    // resetMultipleSelect()
                    setLoader(false)
                    resetFunction()
                }
                setLoader(false)
            }).catch(e => {
                console.log(e, "error of posting symptom tracking!!!!!!!");
                setLoader(false)
            })
        }
    }
    // console.log(token);
    // useEffect(() => {

    //     resetMultipleSelect()

    // }, [])

    const resetMultipleSelect = () => {
        if (symptomList.length > 0) {
            let newArr = [...symptomList]
            newArr.map((item, ind) => {
                // item.data=[...newLowerRating]
                item.isSelected = false
                return { ...item }
            })
            // console.log(JSON.stringify(newArr),"jsagdgjasfgsgfgfksjdfssfsfasfasf");
            setSymptomNewArr(newArr)
        }
    }

    const handleMultipleSelect = async (index) => {
        // alert(index)
        setCommentInput(false)

        let arr = [...newLowerRating]
        arr.map(el => {
            el.isSelected = false
            return el
        })
        setNewLowerRatting(arr)
        let newArr = [...symptomList]
        newArr.map((item, ind) => {
            index == ind ? item.isSelected = !item.isSelected : item.isSelected = false
            index == ind ? item.data = newLowerRating : null
            return { ...item }
        })
        setSymptomNewArr(newArr)

    }
    const handleRemoveSymptom = (item, index) => {
        //    alert(index)
        let arr = [...arrToSend]
        arr.splice(index, 1);
        // console.log(arr,"newwwww arrrrrrrr");
        setArrToSend(arr)
    }
    const renderArrayToTrack = ({ item, index }) => {
        return (
            <View style={styles.symptomsBox}>
                <Text style={styles.symptomText}>{item.title}  ( {item.rating} )</Text>
                <Text style={[styles.symptomText, { fontSize: moderateScale(9) / fontScalingFactor, paddingTop: verticalScale(5) }]}>Comment:- {'\n'}{item.comment}</Text>
                <TouchableOpacity onPress={() => handleRemoveSymptom(item, index)}
                    style={{ position: "absolute", right: 5, top: 5 }}>
                    <Image
                        source={images.cross}
                        style={{ height: scale(13), width: scale(13), right: scale(5) }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const rendersymtomslist = (item, index) => {
        console.log("value indse the render", item)
        return (
            <View style={{ backgroundColor: "green" }}>
                <Text style={{ color: "#000" }}>{item.Symptoms}</Text>
            </View>
        )
    }
    const handleSymptomSelection = (item, index) => {
        setSelectSymptom(false)
        setSelectedSymptom(item.title)
    }
    const onAddingGoals = async () => {
        if (addGoal == "") {
            successToast("Please add your goal")
        }
        else {
            await dispatch(addingGoals(addGoal, token)).then(res => {
                console.log(res);
                if (res.success == true) {
                    successToast("Added Successfully")
                } else {
                    successToast(res.message)
                }
            }).catch(e => {
                errorToast(e.message)
            })
            await dispatch(getUserGoals(token))
            setAddGoal("")
        }
    }
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {loader && <LoadingComponent />}
            <ScrollView>

                <View style={styles.topBox}>
                    <Text style={[styles.topText]}>Add individual goals you would like to achieve in therapy. As you enter goals, try to think about ways you will know you are making progress on these goals, or how you will know you have achieved them.</Text>
                    {/* <Text style={{ fontStyle: 'italic', fontWeight: "400", color: colors.black,top:verticalScale(20),width:"40%",
                 fontSize: moderateScale(12) / fontScalingFactor}}>Not seeing the symptom you want to track? Scroll down to "other" and you can add any symptom you want!</Text> */}
                    <Image
                        source={images.goalsScreenImage}
                        style={styles.topImage}
                        resizeMode='stretch'
                    />
                          
                      </View>
                      <View style={[styles.topBox,{marginTop:0,paddingTop:0}]}>
                <Text style={[styles.topText, {
                    fontSize: moderateScale(12) / fontScalingFactor, width: "100%",
                    fontWeight: "300", color: colors.black,
                }]}><Text style={{ fontStyle: 'italic', fontWeight: "400", color: colors.black, }}>For example:</Text>{` If your goal is to feel healthy, maybe one marker of success is sleeping through the night, or being able to go for a 30 minute walk with a friend. These will be the mile markers you use to judge your rating toward achieving your goal.`}</Text>
                     <Text style={[styles.topText, {
                         fontSize: moderateScale(12) / fontScalingFactor, width: "100%",
                         fontWeight: "300", color: colors.black,marginTop:scale(0)
                        }]}>{`Unsure about your goals? Ask your therapist for help!`}</Text>
                <Text style={styles.addText}>Add goals to track</Text>
                        </View>
                {/* {
                    alert(selectSymptom)
                } */}
                {
                    // selectedSymptom == "other" ?
                    //     <View style={[styles.input, {}]}>
                    //         <TextInput
                    //             value={text}
                    //             onChangeText={(t) => setText(t)}
                    //             placeholder='Enter symtoms'
                    //             placeholderTextColor={"#000"}
                    //             style={{ color: colors.black, width: "100%", height: "100%", paddingHorizontal: verticalScale(10) }}
                    //         />
                    //         {/* <Image
                    //     source={images.downArrrow}
                    //     style={{ height: scale(10), width: scale(16) }}
                    //     resizeMode='stretch'
                    // /> */}
                    //     </View>
                    //     :

                        // <TouchableOpacity activeOpacity={0.2} style={[styles.customDrawerBox, {
                        //     width: windowWidth - scale(50),
                        //     alignSelf: "center", left: 0
                        // }]}
                        //     onPress={() => setSelectSymptom(!selectSymptom)}
                        // >
                        //     <Text style={{ color: colors.black }}>{selectedSymptom}</Text>
                        //     <Image
                        //         source={images.downArrrow}
                        //         style={{ height: scale(8), width: scale(12) }}
                        //         resizeMode='stretch'
                        //     />
                        // </TouchableOpacity>
                }
                {/* {
                    selectSymptom &&
                    <View style={styles.dropdown}>
                        <ScrollView nestedScrollEnabled={true}>


                            {adminSymptoms.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleSymptomSelection(item, index)}
                                        style={{ marginHorizontal: 10, marginVertical: 3, justifyContent: "center" }}>
                                        <Text style={{ color: colors.black, flexWrap: 'wrap', fontSize: moderateScale(13) / fontScalingFactor, fontWeight: '400' }}>{item.title}</Text>
                                    </TouchableOpacity>

                                )
                            })}
                        </ScrollView>
                    </View>
                } */}
                 <TextInput
                    value={addGoal}
                    onChangeText={(t) => setAddGoal(t)}
                    placeholder=''
                    style={styles.input}
                />
                <CommonButtons title={"Add"}
                    onPress={() => onAddingGoals()}
                    customStyle={styles.btnStyle} />
                {/* <CommonButtons
                    onPress={() => addSymptom()}
                    title={"Add"} customStyle={styles.btnStyle} /> */}
                <View style={styles.greyLine}></View>
                {
                    symptomList.length != 0 &&
                    <>
                        <View style={styles.bottomBox}>
                            <Text style={styles.dropDownTitle}>Select goals to track</Text>
                            <Text style={styles.dropDownDes}>Here you can track and rate your goals anytime you like</Text>
                            <TouchableOpacity activeOpacity={0.2} style={styles.customDrawerBox}
                                onPress={() => setSelecting(!selecting)}
                            >
                                <Text style={{ color: '#000' }}>Select goals</Text>
                                <Image
                                    source={images.downArrrow}
                                    style={{ height: scale(8), width: scale(12) }}
                                    resizeMode='stretch'
                                />
                            </TouchableOpacity>
                            <View style={{ marginTop: scale(10) }}>
                                {
                                    selecting &&
                                    symptomNewArr.map((item, index) => {
                                        return (<View style={{ flexDirection: 'column' }}>
                                            <TouchableOpacity style={styles.innerContent}
                                                onPress={() => handleMultipleSelect(index)}>
                                                {/* <View style={styles.greyLine}></View> */}
                                                <Image
                                                    source={item.isSelected ? images.tickBox : images.squareBox}
                                                    style={styles.tickIcon}
                                                />
                                                <Text style={{
                                                    paddingHorizontal: scale(3),
                                                    // marginTop: scale(10),
                                                    marginHorizontal: scale(10),
                                                    color: colors.black
                                                }}>
                                                    {item.title}
                                                </Text>
                                                {

                                                    // item.isSelected ?
                                                    //     <AntDesign name="checkcircleo" size={scale(16)}
                                                    //         color={colors.black} />
                                                    //     :
                                                    //     <Entypo name='circle' size={scale(16)}
                                                    //         color={colors.black} />
                                                }
                                            </TouchableOpacity>

                                            {
                                                item.isSelected &&
                                                <View style={styles.ratingBox}>
                                                    <View style={styles.ratingLine}></View>
                                                    {
                                                        item.data.map((el, ind) => {
                                                            return (
                                                                <TouchableOpacity onPress={() => {

                                                                    handleRatting(item, index, ind)
                                                                }}
                                                                    style={styles.ratingData}>
                                                                    <Image
                                                                        source={item.data[ind].isSelected ? images.selectedRating :
                                                                            images.ratingCircle}
                                                                        style={{ height: scale(15), width: scale(15) }}
                                                                        resizeMode='stretch'
                                                                    />
                                                                    <Text style={{ color: '#000' }}>{item.num}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                    <Text style={styles.lowSev}>low severity</Text>
                                                    <Text style={styles.highSev}>high severity</Text>
                                                </View>
                                            }
                                            {
                                                // item.isSelected && commentInput &&
                                                // <View style={{}}>
                                                //     {/* <Text style={[styles.arrHeading, { fontSize: moderateScale(12) / fontScalingFactor }]}>Add your comment</Text> */}
                                                //     <TextInput
                                                //         value={comment}
                                                //         onChangeText={(v) => setComment(v)}
                                                //         placeholder='Add your comment...'
                                                //         style={[styles.input, { marginTop: verticalScale(5) }]}
                                                //     />

                                                // </View>
                                            }
                                        </View>
                                        )
                                    })
                                }
                            </View>
                            {/* <View style={{flexDirection:"row",flexWrap:"wrap"}}> */}
                            {
                                arrToSend.length > 0 &&
                                <>
                                    <Text style={styles.arrHeading}>Added tracking information</Text>
                                    <FlatList
                                        data={arrToSend}
                                        keyExtractor={item => item.title}
                                        numColumns={2}
                                        renderItem={renderArrayToTrack}
                                    />

                                </>
                            }
                            {/* </View> */}
                            <CommonButtons
                                onPress={() => addGoalsByRating()}
                                title={"Save"} customStyle={styles.btnStyle2} />
                            <View style={{ height: 50 }}></View>
                        </View>
                    </>
                }
            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={commentInput}
                onRequestClose={() => {
                    setCommentInput(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.arrHeading, { fontSize: moderateScale(15) / fontScalingFactor, marginTop: 10 }]}>Add your comment</Text>
                        <Text style={[styles.dropDownDes, { textAlign: "center", width: "85%" }]}>Here you can add your comment to your selected Goal to track.</Text>
                        <TextInput
                            value={comment}
                            onChangeText={(v) => setComment(v)}
                            placeholder='Add your comment...'
                            style={[styles.input, { marginTop: verticalScale(5), width: "90%", height: verticalScale(120) }]}
                            textAlignVertical='top'
                            multiline={true}
                        />
                        <CommonButtons title={"Add"}
                            onPress={() => {
                                handleSymptomComments()
                            }}
                            customStyle={{ height: verticalScale(35), width: "90%", marginVertical: verticalScale(15) }} />

                        <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }}
                            onPress={() => {
                                setCommentInput(false)

                            }}
                        >

                            <Image
                                source={images.crossGrey}
                                style={{ height: scale(15), width: scale(15) }}
                                resizeMode='stretch'

                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>





        </SafeAreaView>
    )
}

export default Goals2

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:"#00000077"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // height: windowHeight / 2,
        width: windowWidth - scale(50),
        top: verticalScale(-50)
    },
    lowSev: {
        position: "absolute", bottom: 0, left: -8, color: colors.signUpBtn, fontSize: moderateScale(9) / fontScalingFactor
    },
    highSev: {
        position: "absolute", bottom: 0, right: -8, color: colors.signUpBtn, fontSize: moderateScale(9) / fontScalingFactor
    },
    topBox: {
        // height: scale(200),
        width: windowWidth - scale(30),
        alignSelf: "center",
        marginTop: scale(20),
        padding: scale(10)
    },
    topText: {
        fontSize: moderateScale(14) / fontScalingFactor,
        fontWeight: "700",
        // fontFamily: "Plus Jakarta Sans",
        width: "45%",
        zIndex: 56,
        color: colors.signUpBtn,
        top: scale(20)
    },
    topImage: {
        position: "absolute",
        right: scale(10),
        top: scale(10),
        height: verticalScale(180),
        width: "60%"
    },
    addText: {
        alignSelf: "center",
        fontSize: moderateScale(16) / fontScalingFactor,
        fontWeight: "700",
       marginTop:verticalScale(30),
        color: colors.black,
        marginBottom: scale(8)
    },
    input: {
        height: scale(35),
        borderRadius: scale(10),
        borderWidth: 0.8,
        borderColor: colors.greyText,
        width: windowWidth - scale(50),
        alignSelf: "center",
        // padding: scale(8),
        flexDirection: "row",
        justifyContent: "space-between",
        color: "#000",
        fontSize: moderateScale(10) / fontScalingFactor,
        paddingHorizontal: scale(10)
    },
    btnStyle: {
        backgroundColor: colors.signUpBtn,
        width: windowWidth - scale(50),
        alignSelf: "center", marginTop: scale(10),
        height: scale(35)
    },
    btnStyle2: {
        backgroundColor: colors.buttonColor,
        width: windowWidth - scale(50),
        alignSelf: "center", marginTop: scale(10),
        height: scale(35)
    },
    tickIcon: {
        height: scale(15),
        width: scale(15),
    },
    greyLine: {
        height: 1,
        width: windowWidth,
        backgroundColor: colors.greyText,
        alignSelf: "center",
        marginVertical: scale(40)
    },
    ratingText: {
        alignSelf: "flex-end",
        right: scale(50),
        top: scale(-25),
        fontSize: moderateScale(14) / fontScalingFactor,
        fontWeight: "700",
        color: colors.black,
        // fontFamily: "Inter"
    },
    dropDownTitle: {
        fontSize: moderateScale(16) / fontScalingFactor,
        fontWeight: "600",
        // fontFamily: "Inter",
        marginTop: scale(12),
        color: colors.black
    },
    dropDownDes: {
        fontSize: moderateScale(11) / fontScalingFactor,
        fontWeight: "300",
        // fontFamily: "Inter",
        marginBottom: scale(12),
        color: colors.black,
        width: "90%",
    },
    bottomBox: {
        width: windowWidth - scale(50),
        alignSelf: "center"
    },
    ratingData: { height: "100%", width: "9%", marginRight: "1%", alignItems: "center", justifyContent: "center" },
    ratingBox: {
        height: scale(40), width: "100%", backgroundColor: "white",
        flexDirection: "row", justifyContent: "center",
        alignItems: "center"
    },
    customDrawerBox: {
        height: scale(35),
        width: windowWidth - scale(30),
        borderWidth: 0.7,
        borderColor: colors.greyText,
        borderRadius: scale(8),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: scale(10),
        left: scale(-10),

    },
    selectionBox: {
        height: scale(200),
        width: windowWidth - 50,
        backgroundColor: "#f1f1f1",
        marginTop: scale(5),
    },
    innerContent: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.mainColor,
        paddingHorizontal: scale(3),
        borderRadius: scale(10),
        // flexWrap: "wrap",
        height: 30,
        margin: scale(4),
    },
    ratingLine: {
        height: 1, width: "90%", backgroundColor: "lightgrey",
        position: "absolute",
        zIndex: -2,
        top: Platform.isPad ? verticalScale(24) : scale(12),
        left: "5%",
        alignSelf: "center"
    },
    symptomsBox: {
        minHeight: scale(35),
        width: windowWidth / 2.5,
        backgroundColor: colors.signUpBtn,
        margin: scale(3),
        // alignItems: "center",
        // justifyContent: "center",
        borderRadius: scale(10),
        padding: verticalScale(10),
        borderWidth: 0.5
    },
    symptomText: {
        color: colors.mainColor,
        fontSize: moderateScale(12) / fontScalingFactor,
        width: "80%"
    },
    arrHeading: {
        fontSize: moderateScale(17) / fontScalingFactor,
        color: colors.black, marginVertical: scale(5),
        fontWeight: "600"
    },
    dropdown: {
        height: '20%',
        width: windowWidth - scale(50),
        borderWidth: 0.7,
        borderColor: colors.greyText,
        borderRadius: scale(8), justifyContent: "center", alignSelf: "center", marginTop: 5
    }


})