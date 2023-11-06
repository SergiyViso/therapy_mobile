
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./Colors";
import PixelRatio from "react-native/Libraries/Utilities/PixelRatio";
import Toast from 'react-native-toast-message'
export const windowHeight = Dimensions.get("window").height
export const windowWidth = Dimensions.get("window").width
export const fontScalingFactor = PixelRatio.getFontScale()
// import{requestMultiple, PERMISSIONS} from 'react-native-permissions'
export const commonStyles = StyleSheet.create({
    mainContainer :{
        flex:1,
        backgroundColor:colors.mainColor
    }
})
export const successToast = (text)=>{
    Toast.show({
        type:"success",
        text1:text
    })
}
export const errorToast = (text)=>{
    Toast.show({
        type:"error",
        text1:text
    })
}