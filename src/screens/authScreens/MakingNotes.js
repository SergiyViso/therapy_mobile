import { FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { commonStyles, fontScalingFactor, windowHeight, windowWidth } from '../../components/CommonStyles'
import StatusBarComponent from '../../components/StatusBarComponent'
import { colors } from '../../components/Colors'
import { images } from '../../components/Images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CommonButtons from '../../components/CommonButtons'
import { slides } from '../../utils/utils';
import { useDispatch } from 'react-redux'
import { isAccessToken } from '../../../redux/actions/authAction'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MakingNotes = (props) => {
    const [currentIndex, setcurrentIndex] = useState(0)
    const [focusedIndex, setFocusedIndex] = useState(0)
    const listRef = useRef()
    const dispatch = useDispatch()
    const  navigation = useNavigation()
    // console.log(slides);
    const renderItem = ({ item }) => {
        return (
            <View style={{width:windowWidth,top:-2}}>
                <Image
                    source={item.image}
                    style={styles.notesImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.text}</Text>
            </View>
        );
    }
    const handleNext = () => {
        if (focusedIndex != 2) {
            
            setFocusedIndex(focusedIndex + 1)
            listRef.current.scrollToIndex({ index: focusedIndex +1 })
        }
    }
    const handleSkip = async () => {
        const status = await AsyncStorage.setItem("userStatus", "existingUser")
        navigation.replace("Welcome")
    }
    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log("Visdfms are", viewableItems);
        console.log("dsdfsfsff", changed);
        setFocusedIndex(changed[0].index)
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }
    const onScroll = useCallback((event) => {

            const slideSize = event.nativeEvent.layoutMeasurement.width;
            const index = event.nativeEvent.contentOffset.x / slideSize;
            const roundIndex = Math.round(index);
            console.log("roundIndex:", roundIndex);
            setFocusedIndex(roundIndex)
      }, []);
    return (
        <SafeAreaView style={commonStyles.mainContainer}>
            <StatusBarComponent />
            <View style={styles.contentBox}>
                <FlatList 
                    // pagingEnabled 
                    horizontal={true} 
                    // ref={listRef}
                    renderItem={renderItem} 
                    data={slides}
                    keyExtractor={(item=>item.id)}
                    // onScroll={(e)=> {
                    //   let number =  e.nativeEvent.contentOffset.x/windowWidth
                    //     focusedIndex(Math.ceil(number))}}
                    // onMomentumScrollEnd={(e)=>onScroll(e)}
                    // showsHorizontalScrollIndicator={false}
                    // onViewableItemsChanged={_onViewableItemsChanged}
                    // viewabilityConfig={_viewabilityConfig}
                />
            </View>
            <View style={styles.dotContaienr}>
                {/* {slides.map((item, index) => (
                    <View style={index ==focusedIndex? styles.cricle:styles.cricle1} />
                ))} */}
            </View>
            <CommonButtons title={"Next"} customStyle={styles.btnStyle} 
            // onPress={()=>handleNext()}
            onPress={()=>handleSkip()}
             />
            {/* <CommonButtons title={"Skip"} customStyle={styles.btnStyle2} customText={styles.btnText} 
            onPress={()=>handleSkip()}
            /> */}
        </SafeAreaView>
    )
}

export default MakingNotes

const styles = StyleSheet.create({
    notesImage: {
        height: "70%",
        width: "100%",
        maxWidth:scale(260),
        alignSelf:"center",
        // marginTop:scale(60)
    },
    dotContaienr: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop:scale(20),
    
    },
    cricle: {
        width: 10,
        height: 10,
        borderRadius: 10, marginHorizontal: 5,
        backgroundColor: "red",
    },
    cricle1: {
        width: 10,
        height: 10,
        borderRadius: 10, marginHorizontal: 5,
        backgroundColor: "#eecc",
    },
    slide: {
        height: 200,
    },
    contentBox: {
        height: windowHeight / 2,
        // width: ,
        marginTop: scale(60),
        alignSelf: "center",
    },
    title: {
        color: colors.signUpBtn,
        fontSize: moderateScale(25)/fontScalingFactor,
        alignSelf: "center",
        fontWeight: "700",
        marginTop: scale(12)
    },
    description: {
        color: colors.black,
        fontSize: moderateScale(14)/fontScalingFactor,
        alignSelf: "center",
        fontWeight: "300",
        marginTop: scale(5),
        width: windowWidth - scale(90),
        textAlign: "center",
        zIndex:100,
        // backgroundColor:"red"
    },
    btnStyle: {
        backgroundColor: colors.signUpBtn,
        borderRadius: 25,
        width: windowWidth - scale(70),
        alignSelf: "center", marginTop: scale(20)
    },
    btnStyle2: {
        backgroundColor: colors.white,
        borderRadius: 25,
        width: windowWidth - scale(72),
        alignSelf: "center", marginTop: scale(20),
        borderWidth: 1,
        borderColor: colors.signUpBtn,
        height: scale(48)
    },
    btnText: {
        color: colors.signUpBtn
    }

})