import React, { useEffect, useState } from 'react'
import { FormProvider, useForm, } from 'react-hook-form'
import {
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Modal,
    View,
    ActivityIndicator,
} from 'react-native'
import LottieView from 'lottie-react-native'
// import { navigationStrings } from '../../Navigation/navigationStrings';
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../../components/Colors'
import MainHeader from '../../../components/MainHeader'
import { getUserProfile } from '../../../../redux/actions/authAction'
// import { err } from 'react-native-svg/lib/typescript/xml'

const CardScreen = ({route}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isToken = useSelector(state => state.auth.accessToken);
    const userDetails = useSelector(state => state.auth.user)
    const [loader, setloader] = useState(false);
    const [modal, setModal] = useState(false);
    // console.log("check teh dta a===>",route.params.amount)
    const formMethods = useForm({

        mode: 'onBlur',

        defaultValues: {
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: '',

        },
    })
    const isFocused = useIsFocused()
    useEffect(()=>{
        formMethods.reset({
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: '',
          });
    },[])


    const { handleSubmit, formState } = formMethods
    async function onSubmit(model) {
        let monthdata = model.expiration.split("/")
        let expMonth = monthdata[0];
        let expYear = monthdata[1];
        setloader(true);
        let finalCardNumber = model.cardNumber.replace(/\s+/g, '')
        // console.log("check card number1--->", finalCardNumber)
        // console.log('Success: ' + JSON.stringify(model, null, 2))

        try {
            setloader(true);
            setModal(true);
            var data = new FormData();
            data.append("name", model.holderName);
            data.append("card_number", finalCardNumber)
            data.append("cvc", model.cvv);
            data.append("exp_month", expMonth);
            data.append("exp_year", expYear);
            data.append("plan_id",route?.params?.price);
            console.log('what is the carddetailsssss', data);
            const res = await fetch("https://kate.nvinfobase.com/api/subscribe", {
                method: "POST",
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                    'Authorization': `Bearer ${isToken}`
                }
            })
            let responseJson = await res.json();
            console.log("responseJsonresponseJson", responseJson)
            if (responseJson.status == true) {
                setloader(false);
                setModal(false);
                alert(responseJson.message)
                dispatch(getUserProfile(isToken)).then((res)=>{
                    console.log("user detials",res)
                    navigation.navigate("PlanScreen")
                }).catch(e=>console.log(e,"error while userProfile"))
                
            } else {
                setloader(false);
                setModal(false);
                alert(responseJson.message)
            }

        } catch (error) {
            setloader(false);
            setModal(false);
            console.log("check tehhjbjhbd==>", error)
        }

    }


    return (

        <FormProvider {...formMethods}>

            <SafeAreaView style={styles.container}>
                <MainHeader backIcon />
                <Modal visible={modal} animationType="slide" transparent={true}>
                    <View
                        style={{
                            backgroundColor: '#00000080',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <View style={{ width: "100%" }}>
                            {loader && <ActivityIndicator size="large" color="white" />}
                        </View>
                    </View>
                </Modal>
                <KeyboardAvoidingView
                    style={styles.avoider}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

                >
                    {Platform.OS == "android" ?

                        <CreditCardForm

                            fonts={{
                            }}
                            LottieView={LottieView}
                            inputColors={{
                                focused: 'gray',
                                errored: '#B00020',
                                regular: '#B9C4CA',
                            }}
                            horizontalStart
                            overrides={{
                                labelText: {
                                    marginTop: 16,
// marginHorizontal:2
                                },
                                cardPreview: {
                                    alignSelf: "center",
                                    marginHorizontal: "2%",
                                    marginRight: "9%",
                                },
                                cardHolderPreview: {
                                },
                                outline: {
                                },
                                input: {
                                    borderRadius: 15, padding: 0, height: 55, paddingHorizontal: 12, color: "white"
                                },
                                labelContainer: {
                                    color: "green",
                                    borderRadius: 20, backgroundColor: '#001526', height: 0,
                                },
                                inputLabel: {
                                    fontSize: 18, backgroundColor: '#001526'
                                },
                                errorText: {
                                    fontSize: 14, color: "red"
                                }
                            }}
                        />
                        :

                        <CreditCardForm
                            fonts={{

                            }}
                            LottieView={LottieView}
                            inputColors={{
                                focused: 'gray',
                                errored: '#B00020',
                                regular: '#B9C4CA',
                            }}
                            horizontalStart
                            overrides={{

                                labelText: {
                                    marginTop: 16,
// marginHorizontal:5
                                },
                                cardPreview: {
                                    // backgroundColor:"green",
                                    alignSelf: "center",
                                    marginHorizontal: "2%",
                                    marginRight: "5%",

                                },
                                cardHolderPreview: {
                                    // backgroundColor:"gray"
                                },
                                outline: {
                                    // backgroundColor:"red",

                                },
                                input: {
                                    //backgroundColor:"green",
                                    borderRadius: 15, padding: 20, height: 55, paddingHorizontal: 8, color: "white",width:"98%"
                                },
                                labelContainer: {
                                    color: "green",
                                    // backgroundColor:"#adff2f",
                                    borderRadius: 20, backgroundColor: '#001526', height: 0,
                                },
                                inputLabel: {
                                    fontSize: 18, backgroundColor: '#001526'
                                },
                                errorText: {
                                    fontSize: 14, color: "red"
                                }
                            }}
                        />

                    }
                </KeyboardAvoidingView>
                {formState.isValid && (
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>CONFIRM PAYMENT</Text>
                    </TouchableOpacity>
                )}
                 
            </SafeAreaView>

        </FormProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#001526',
    },
    avoider: {
        flex: 1,
        padding: 20,
        backgroundColor: '#001526'
    },
    button: {
        backgroundColor: colors.buttonColor,
        borderWidth: 1,
        marginHorizontal: ('5%'),
        borderRadius: ("10%"),
        width: ('90%'),
        // marginTop: 280,
        justifyContent: 'center',
        alignItems: 'center',
        height: '8%', position: "absolute", bottom: 10, borderRadius: 10

    },

})

export default CardScreen