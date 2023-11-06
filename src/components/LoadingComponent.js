import React, { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {
    // const [loader,setLoader] = useState(true)
 const exportedToken = {
        token : useSelector(state=>state.auth.accessToken)
    }
    return (
        <Modal transparent={true}  animationType='fade' >
            <View style={styles.fullContainer}>
                <ActivityIndicator size={'large'} color="white" />
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000066"
    }
})