import { Platform, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import { useSelector } from 'react-redux'
import { moderateScale, scale } from 'react-native-size-matters'
import { fontScalingFactor, windowWidth } from '../../components/CommonStyles'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import moment from 'moment'
const HomeWorkSearch = () => {
    const homeWorkData = useSelector(state => state.main.homeWorkList)
    const [search, setSearch] = useState("")
    const [Data, setData] = useState(homeWorkData)
    const [filteredData, setFilteredData] = useState(homeWorkData)
    const handleFilterChange = (text) => {
        setSearch(text);
        setFilteredData(Data.filter((i) => i.short_description.toLowerCase().includes(text.toLowerCase())))

    };
    return (
        <View style={styles.mainContainer}>
            <MainHeader backIcon />
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, marginBottom: 10 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 20, marginTop: '10%' }}>
                    {filteredData.map(item => (
                        <View activeOpacity={1} style={styles.newNotes2}>
                            <Text numberOfLines={1} style={styles.date}>{item.short_description}</Text>
                            <Text numberOfLines={2} style={styles.notes}>{item.description}</Text>
                            <View style={styles.itemTimeBox}>
                                <Text style={styles.time}>{moment(item.updated_at).format("dddd, MMM Do, hh:mm a")}</Text>
                                <Image
                                    style={styles.redRightArrow}
                                    source={images.redRightArrow}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeWorkSearch

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
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
    sortText: {
        color: '#000'
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
    redRightArrow: {
        height: scale(15),
        width: scale(15),
        left: scale(10)
    },
    input: {
        height: "100%",
        width: "80%",
        paddingLeft: 15,
        fontSize: moderateScale(13) / fontScalingFactor,
        color: colors.black
    },
})