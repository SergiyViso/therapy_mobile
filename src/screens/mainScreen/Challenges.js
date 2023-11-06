import { Alert, BackHandler, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
//import Orientation from 'react-native-orientation-locker'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import StatusBarComponent from '../../components/StatusBarComponent'
import MainHeader from '../../components/MainHeader'
import { windowHeight, windowWidth } from '../../components/CommonStyles'
import { scale, verticalScale } from 'react-native-size-matters'

const Challenges = (props) => {
    const navigation = useNavigation()
    useEffect(() => {
        const backAction = () => {
          //  Orientation.lockToPortrait()
            navigation.goBack() 
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    useEffect(() => {
     // Orientation.lockToLandscape()
    }, [navigation])
    
  return (
    <SafeAreaView >
      <MainHeader backIcon customStyle={{width:windowHeight+verticalScale(14)}} />
      <View style={styles.contentBox}>
        <View style={{width:"50%",flex:1,backgroundColor:"green",height:200}}></View>
      </View>
    </SafeAreaView>
  )
}

export default Challenges

const styles = StyleSheet.create({
    contentBox:{
        backgroundColor:"red",
        width:windowHeight,
        height:windowWidth/ 1.5
    }
})