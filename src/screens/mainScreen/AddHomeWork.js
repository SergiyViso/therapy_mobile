import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { commonStyles, errorToast, fontScalingFactor, successToast, windowHeight, windowWidth } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import CommonButtons from '../../components/CommonButtons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHomework, getUserHomeWork, PostHomework, updateHomeWork } from '../../../redux/actions/mainAction'
import CommonModal from '../../components/CommonModal'
import LoadingComponent from '../../components/LoadingComponent'
import { useNavigation } from '@react-navigation/native'

const AddHomeWork = ({ route }) => {
    const token = useSelector(state => state.auth.accessToken)
    const [shortDes, setShortDes] = useState(route.params.data.short_description)
    const [longDes, setLongDes] = useState(route.params.data.description == null?" ":route.params.data.description)
    const [thoughts, setThoughts] = useState(route.params.data.thoughts== null?" ":route.params.data.thoughts)
    const [saveImage, setSaveImage] = useState(route.params.data.file)
    const [modal, setModal] = useState(false);
    const [loader, setloader] = useState(false);
    const type = route.params.type
    const itemId = route.params.data.id
    console.log(route.params.data.description, "yuyuyuyuyuyuyu",route.params.data.thoughts);
    const navigation = useNavigation()
    const resetData = () => {
        setShortDes("")
        setLongDes("")
        setThoughts("")
        setSaveImage("")
    }

    console.log(saveImage);
    const dispatch = useDispatch()


    const handleSave = () => {
        if (shortDes.trim() == "") {
            errorToast("Please enter homework!")
        } else {
            setloader(true)
            var formdata = new FormData()
            formdata.append("short_description", shortDes)
            formdata.append("description", longDes)
            formdata.append("thoughts", thoughts)
            formdata.append("file", saveImage ? { uri: saveImage?.uri, name: saveImage?.fileName, type: saveImage?.type } : "")
            dispatch(PostHomework(token, formdata)).then(async res => {
                console.log(res, "homework response");
                await dispatch(getUserHomeWork(token)).then(res=>{
                    console.log(res,"ggttttttttttttttt");
                    setloader(false)
                }).catch(e=>{
                    console.log(e);
                    setloader(false)
                })
                if (res.success == true) {
                    successToast("Homework added Successfully")
                    setloader(false)
                    navigation.goBack()
                    resetData()
                }
            }).catch(e => {
                console.log(e);
                setloader(false)
            })
        }
    }

    const handleUpdate = () => {
        if (shortDes.trim() == "") {
            errorToast("Please enter homework!")
        } else {
            setloader(true)
            var formdata = new FormData()
            formdata.append("short_description",shortDes)
            formdata.append("description",longDes)
            formdata.append("thoughts",thoughts)
            formdata.append("file",saveImage == route.params.data.file && type != "New" ? "" : saveImage == route.params.data.file ? "": { uri: saveImage?.uri, name: saveImage?.fileName, type: saveImage?.type})
            dispatch(updateHomeWork(token, formdata, itemId)).then(async res => {
                await console.log(res, "asasdasdasdadasdadasda");
                if (res.success) {
                    setloader(false)
                    successToast("Updated successfully")
                    await dispatch(getUserHomeWork(token))
                    navigation.goBack()
                } else {
                    setloader(false)
                    errorToast(res.message)
                }
            }).catch(e => {
                console.log(e, "dgdgdsgsdgsdg");
                setloader(false)
                errorToast("Network error")

            })
        }
    }
    const handleDelete = () => {
        setloader(true)
        dispatch(deleteHomework(token, itemId)).then(async res => {
            console.log(res, "deleted response");
            if (res.success == true) {
                await dispatch(getUserHomeWork(token))
                successToast("Deleted successfully")
                navigation.goBack()
            }
            setloader(false)
        }).catch(e => {
            console.log(e);
            setloader(false)
        })
    }

    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {
                modal && <CommonModal isVisible={modal} onChange={(value) => setModal(value)}
                    onSelectImage={(image) => setSaveImage(image)} />
            }
            {loader && <LoadingComponent />}
            <ScrollView>
                <View style={styles.upperContentBox}>
                    <View style={{ width: "60%" }}>
                        <Text style={styles.title}>Woohoo! Time for homework!</Text>
                        <Text style={styles.description}>Feel free to add just a few words to remember it by and finish the rest later</Text>
                    </View>
                    <Image
                        source={images.homeWork}
                        style={{ height: "90%", width: "50%", zIndex: -1, position: "absolute", right: scale(0) }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.titleText}>Short description of homework</Text>
                    <TextInput
                        value={shortDes}
                        onChangeText={(t) => setShortDes(t)}
                        style={styles.shortDesInput}
                    />
                    <Text style={styles.titleText}>ADD File</Text>
                    <View style={styles.addFileBox}>
                        <TouchableOpacity onPress={() => setModal(true)} style={styles.chooseFileBox}>
                            <Text style={styles.chooseText}>Choose file</Text>
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={[styles.chooseText, { width: "50%" }]}>
                            {!saveImage ? "No file chosen" : saveImage.fileName ? saveImage.fileName : saveImage}</Text>
                    </View>
                    <Text style={styles.titleText}>What is the homework?</Text>
                    <TextInput
                        value={longDes}
                        onChangeText={(t) => setLongDes(t)}
                        style={styles.longDesInput}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    <Text style={styles.titleText}>Thoughts, responses, how did it go?</Text>
                    <TextInput
                        value={thoughts}
                        onChangeText={(t) => setThoughts(t)}
                        style={styles.longDesInput}
                        multiline={true}
                        textAlignVertical='top'
                    />
                    {
                        type == "New" ?
                            <CommonButtons title={'Save'} customStyle={styles.btnStyle} onPress={() => handleSave()} />
                            : <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

                                <CommonButtons title={'Update'} customStyle={styles.btnStyle2}
                                  onPress={() => handleUpdate()}

                                />
                                <CommonButtons title={'Delete'} customStyle={styles.btnStyle2}
                                 onPress={() => handleDelete()}
                                />
                            </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddHomeWork

const styles = StyleSheet.create({
    upperContentBox: {
        height: scale(200),
        width: windowWidth - scale(40),
        alignSelf: "center",
        marginVertical: scale(20),
        // flexDirection:"row"
    },
    title: {
        fontSize: moderateScale(20) / fontScalingFactor,
        marginVertical: scale(10), color: colors.black,
        fontWeight:"500"
    },
    description: {
        color: colors.black,
        fontSize: moderateScale(12) / fontScalingFactor,
        fontWeight: "300",
        width:"80%"
    },
    titleText: {
        fontSize: moderateScale(13) / fontScalingFactor,
        fontWeight: "600",
        // fontFamily: "Inter",
        marginVertical: scale(12),
        color:colors.black
    },
    box: {
        width: windowWidth - scale(40),
        alignSelf: "center"
    },
    shortDesInput: {
        borderRadius: scale(8),
        borderWidth: 0.5,
        borderColor: colors.black,
        height: scale(35),
        padding: scale(10),
        color:colors.black
    },
    longDesInput: {
        borderRadius: scale(8),
        borderWidth: 0.5,
        borderColor: colors.black,
        height: scale(100),
        padding: scale(10),
        color:colors.black
    },
    addFileBox: {
        borderRadius: scale(8),
        borderWidth: 0.5,
        borderColor: colors.descriptionColor,
        height: scale(35),
        flexDirection: "row"
    },
    chooseFileBox: {
        borderRadius: scale(5),
        borderWidth: 0.5,
        borderColor: colors.descriptionColor,
        height: scale(25),
        width: scale(100),
        margin: scale(5),
        justifyContent: "center",
        flexDirection: "row"
    },
    chooseText: {
        fontSize: moderateScale(14) / fontScalingFactor, alignSelf: "center",
        color:colors.black

    },
    btnStyle: {
        height: scale(35),
        width: windowWidth - scale(40),
        marginVertical: scale(40)
    },
    btnStyle2: {
        height: scale(35),
        width: windowWidth / 2.5,
        marginVertical: scale(40)
    }

})