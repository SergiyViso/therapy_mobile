import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { verticalScale } from 'react-native-size-matters'

export const PaddingHorizontal = ({number}) => {
  return (
        <View style={{paddingHorizontal:number?verticalScale(number):verticalScale(10)}} />
  )
}

export const PaddingVertical = ({number}) => {
    return (
          <View style={{paddingVertical:number?verticalScale(number):verticalScale(10)}} />
    )
  }

const styles = StyleSheet.create({})