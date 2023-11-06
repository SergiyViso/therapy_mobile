import { Image, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from './Images'
import CommonButtons from './CommonButtons'
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from './Colors'
import { errorToast, fontScalingFactor, windowWidth } from './CommonStyles'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CommonModal = ({ isVisible, onChange = (value) => { },onSelectImage =  (image)=>{ } }) => {
    const Clickimage = async () => {
        if (Platform.OS == 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:
                "App needs access to your camera " +
                "so you can take awesome pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            launchCamera({ mediaType: "photo" }, res => {
              if (res.didCancel) {
                console.log("image is cancel")
              } else if (res.errorCode) {
                console.log("image error check ")
              } else if (res.errorMessage) {
                console.log("image message alert ")
              } else {
                // console.log("respone =====>",res.assets);
                onChange(false);
                onSelectImage(res.assets[0])
              }
            })
          } else {
            console.log("Camera Permission denied");
            errorToast("Allow camera permission to click picture")
          }
        }
        else {
          //    alert("not working")
          launchCamera({ mediaType: "photo" }, res => {
            if (res.didCancel) {
              console.log("image is cancel")
            } else if (res.errorCode) {
              console.log("image error check ")
            } else if (res.errorMessage) {
              console.log("image message alert ")
            } else {
              // console.log("respone =====>",res.assets);
              onChange(false);
              onSelectImage(res.assets[0])
            }
          })
        }
      }
      const GALLERY = () => {
        launchImageLibrary({ mediaType: "photo" }, response => {
          console.log("check is working gallery image ", response)
          if (response.didCancel) {
            console.log("image gallery is cancel")
          } else if (response.errorCode) {
            console.log("gallery image error ")
          } else if (response.errorMessage) {
            console.log("")
          } else {
            onChange(false);
            onSelectImage(response.assets[0])
          }
        })
      }
      async function Contactshow() {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "App Camera Permission",
            message:
              "App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
        } else {
          console.log("Camera permission denied");
        }
      }
      useEffect(() => {
        if (Platform.OS == 'android') {
          Contactshow()
        }
      }, []);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                onChange(false)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.modalInnerBox}>
                        <TouchableOpacity style={styles.innerBox1} onPress={() => Clickimage()}>
                            <Image
                                source={images.camera}
                                style={styles.camera}
                                resizeMode='stretch'
                            />
                            <Text style={styles.modalText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.innerBox2} onPress={() => GALLERY()}>
                            <Image
                                source={images.gallery}
                                style={styles.camera}
                                resizeMode='stretch'
                            />
                            <Text style={styles.modalText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <CommonButtons onPress={() => onChange(false)} title='Cancel' customStyle={styles.cancelBtn} />
                </View>
            </View>
        </Modal>
    )
}

export default CommonModal

const styles = StyleSheet.create({
    dp: {
        height: scale(80),
        width: scale(80),
      },
      cameraBackground: {
        zIndex: 8,
        height: scale(18),
        width: scale(80),
        position: "absolute",
        bottom: 0
      },
      dpCircle: {
        height: scale(80),
        width: scale(80),
        alignSelf: "center",
        borderWidth: 2,
        borderColor: colors.buttonColor,
        borderRadius: scale(40),
        marginTop: scale(15),
        overflow: "hidden"
      },
      text1: {
        fontSize: moderateScale(14)/fontScalingFactor,
        alignSelf: "center",
        marginTop: scale(8),
        color: colors.black,
        fontWeight: "400",
        // fontFamily: "Poppins-Regular"
      },
      camera: {
        height: scale(17),
        width: scale(17),
      },
      camera2: {
        height: scale(17),
        width: scale(17),
        position: "absolute",
        bottom: scale(3),
        zIndex: 99,
        alignSelf: "center"
      },
      cancelBtn: {
        height: scale(35),
        width: "80%",
        position: "absolute",
        bottom: scale(20)
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "#00000066"
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: scale(10),
        alignItems: "center",
        shadowColor: colors.buttonColor,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: scale(160),
        width: windowWidth / 1.5,
        justifyContent: "center"
      },
      modalText: {
        textAlign: "center",
        color: colors.white,
        fontSize: moderateScale(9)/fontScalingFactor
      },
      crossImage: {
    
        position: "absolute",
        right: 5,
        top: 5
      },
      cross: {
        height: scale(20),
        width: scale(20),
      },
      modalInnerBox: {
        height: "30%",
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        top: scale(40)
      },
      innerBox1: {
        height: "90%",
        width: "40%",
        backgroundColor: colors.signUpBtn,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: scale(10)
      },
      innerBox2: {
        height: "90%",
        width: "40%",
        backgroundColor: colors.signUpBtn,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: scale(10)
      },
})