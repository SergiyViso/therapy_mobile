import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Agenda } from 'react-native-calendars'
import { windowHeight, windowWidth } from '../../components/CommonStyles'
import { scale } from 'react-native-size-matters'

const AgendaCalender = () => {
  return (
    <View style={styles.calenderBox}>
    <Agenda
      testID={"agenda"}
      items={{
        '2012-05-22': [{name: 'item 1 - any js object'}],
        '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
        '2012-05-24': [],
        '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
      }}
    
    //   onDayPress={(item) => dayPress(item)}
    //   renderEmptyDate={renderEmptyDate}
    //   rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      keyExtractor={item => item.id}
    //   renderList={(item, index) => renderCustomView(item.items, index)}
    />
  </View>
  )
}

export default AgendaCalender

const styles = StyleSheet.create({
    calenderBox: {
        height: windowHeight / 1.8,
        width: windowWidth - scale(30),
        alignSelf: "center",
      },
})