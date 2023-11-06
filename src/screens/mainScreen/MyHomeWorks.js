import { FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from '../../components/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../../components/Images'
import moment from 'moment'
import CommonButtons from '../../components/CommonButtons'
import { useIsFocused } from '@react-navigation/native'
import LoadingComponent from '../../components/LoadingComponent'

const MyHomeWorks = (props) => {
    const homeWorkData = useSelector(state => state.main.homeWorkList)
    const [sortedList, setSortedList] = useState(homeWorkData)
    const [search, setSearch] = useState("")
    const [loader, setLoader] = useState(false)
    const IsFocused = useIsFocused()
    const emptyArr = {}



    const parsedData = sortedList.map(item => {
        return {
            ...item,
            created_at: new Date(item.created_at),
            updated_at: new Date(item.updated_at)
        };
    });



    parsedData.sort((a, b) => a.created_at - b.created_at);


    const groupedData = {};
    parsedData.forEach(item => {
        const monthYear = `${item.created_at.getMonth() + 1}-${item.created_at.getFullYear()}`;
        if (groupedData[monthYear]) {
            groupedData[monthYear].push(item);
        } else {
            groupedData[monthYear] = [item];
        }
    });



    useEffect(() => {
        sortingFunction()
    }, [sortedList, IsFocused])


    const sortingFunction = () => {
        if (homeWorkData.length != 0) {
            const sorted = homeWorkData.sort((a, b) => {
                const dateA = new Date(`${a.created_at}`).valueOf();
                const dateB = new Date(`${b.created_at}`).valueOf();
                if (dateB > dateA) {
                    return 1; // return -1 here for DESC order
                }
                return -1 // return 1 here for DESC Order
            });
            setSortedList(sorted)
        }
    }


    const handleNavigation = (type, item) => {
        if (type == "New") {
            props.navigation.navigate("AddHomeWork", {
                data: {
                    short_description: "",
                    description: "",
                    thoughts: "",
                    file: "",
                    id: 0
                },
                type: type
            })
        } else {
            props.navigation.navigate("AddHomeWork", {
                data: item
            })
        }
    }


    const handleSearch = (text) => {
        setSearch(text);
    }

    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <MainHeader backIcon />
            {
                loader && <LoadingComponent />
            }
            <Text style={styles.screenTitle}>Homework</Text>
            <Text style={styles.description}>In this section, you will write notes
                about what your homework is for
                your therapy session. You can
                either write a description, enter
                a link for a website, etc. </Text>
            <TouchableOpacity  onPress={()=>props.navigation.navigate('HomeWorkSearch')}                         style={styles.searchBox}>
                <View style={styles.inputBox}>
                    <Image
                        source={images.search}
                        style={styles.menu}
                        resizeMode="contain"
                    />
                    <TextInput
                    editable={false}
                        value={search}
                        onChangeText={(t) => handleSearch(t)}
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
            </TouchableOpacity>
            <CommonButtons title={"Add new"} customStyle={styles.btnStyle}
                onPress={() => handleNavigation("New", emptyArr)} />
            <View style={styles.notesBox2}>
                {
                    homeWorkData.length != 0 ?

                        <View>
                            {Object.entries(groupedData)
                                .sort(([a], [b]) => {
                                    // Compare the month-year strings in descending order
                                    const [aMonth, aYear] = a.split('-');
                                    const [bMonth, bYear] = b.split('-');
                                    if (aYear !== bYear) {
                                        return bYear - aYear;
                                    } else {
                                        return bMonth - aMonth;
                                    }
                                })
                                .map(([monthYear, items]) => {
                                    const [monthNumber, year] = monthYear.split('-');
                                    const monthNames = [
                                        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                                    ];
                                    const month = monthNames[parseInt(monthNumber) - 1];

                                    // Sort the items in descending order based on the created_at date
                                    const sortedItems = items.sort((a, b) => b.created_at - a.created_at);


                                    return (
                                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,}}  key={monthYear}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: colors.signUpBtn }}>{month} {year}</Text>
                                            <View contentContainerStyle={{ flexGrow: 1, }}>
                                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {sortedItems.map(item => (
                                                    <TouchableOpacity activeOpacity={1} style={styles.newNotes2}
                                                        onPress={() => handleNavigation("Update", item)}
                                                    >
                                                        <Text numberOfLines={1} style={styles.date}>{item.short_description}</Text>
                                                        <Text numberOfLines={2} style={styles.notes}>{item.description}</Text>
                                                        <View style={styles.itemTimeBox}>
                                                            <Text style={styles.time}>{moment(item.updated_at).format("dddd, MMM Do, hh:mm a")}</Text>
                                                            <Image
                                                                style={styles.redRightArrow}
                                                                source={images.redRightArrow}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                            </View>
                                            <View style={{marginBottom:30}}></View>
                                        </ScrollView>
                                    );
                                })}
                        </View>
                        :
                        <Text style={[styles.date, { fontWeight: "400" }]}>You don't have any homework yet.</Text>
                }




            </View>
        </SafeAreaView>

    )
}

export default MyHomeWorks

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: moderateScale(25) / fontScalingFactor,
        alignSelf: "center",
        fontWeight: "700",
        color: colors.signUpBtn, marginVertical: scale(10)
    },
    newNotes2: {
        height: scale(100),
        width: windowWidth / 2.5,
        borderRadius: 2,
        borderWidth: 0.1,
        justifyContent: "center",
        marginHorizontal: "1.5%",
        marginVertical: "2%",
        padding: 6,
        backgroundColor: "#f9f9f9"

    },
    description: {
        color: colors.black,
        fontSize: moderateScale(12) / fontScalingFactor,
        fontWeight: "300",
        marginHorizontal: 20
    },
    notesBox: {
        maxHeight: windowHeight - scale(190),
    },
    notesBox2: {
        width: windowWidth - scale(20),
        paddingHorizontal: scale(15),
        marginTop: scale(15), flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        alignSelf: "center",
        height: windowHeight / 1.60,
        // backgroundColor:"red"
    },
    date: {
        fontSize: moderateScale(14) / fontScalingFactor,
        color: colors.signUpBtn,
        fontWeight: "500"
    },
    time: {
        fontSize: moderateScale(11) / fontScalingFactor,
        color: colors.time,
        fontWeight: "400",
        width: "80%"
    },
    notes: {
        fontSize: moderateScale(10) / fontScalingFactor,
        color: colors.notes,
        fontWeight: "400",
        paddingVertical: scale(6)
    },
    itemTimeBox: {
        flexDirection: "row",
        // justifyContent: "space-between"
    },
    redRightArrow: {
        height: scale(15),
        width: scale(15),
        left: scale(10)
    },
    btnStyle: {
        alignSelf: "flex-end",
        marginHorizontal: scale(10),
        height: scale(35),
        marginTop: 5,
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
    sortIcon: {
        height: "55%",
        width: scale(20)
    },
    sortBox: {
        width: "25%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        paddingHorizontal: "2%"
    },
    input: {
        height: "100%",
        width: "80%",
        paddingLeft: 15,
        fontSize: moderateScale(13) / fontScalingFactor,
        color: colors.black
    },
    sortText:{
        color:'#000'
    }

})