import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '../../components/CommonStyles'
import MainHeader from '../../components/MainHeader'
import { windowHeight } from '../../components/CommonStyles'
import { scale, verticalScale } from 'react-native-size-matters'

const AcceptChallenge = () => {
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <MainHeader backIcon  customStyle={{width:windowHeight+verticalScale(14)}} />
    </SafeAreaView>
  )
}

export default AcceptChallenge

const styles = StyleSheet.create({})