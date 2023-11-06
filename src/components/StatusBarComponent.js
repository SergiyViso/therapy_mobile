import { StatusBar, StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import { colors } from './Colors'

const StatusBarComponent = ({backgroundColor,color}) => {
  return (
    <StatusBar  barStyle={!color?"dark-content":"light-content"} backgroundColor={backgroundColor?backgroundColor:colors.white} />
  )
}

export default StatusBarComponent

const styles = StyleSheet.create({})