import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { notesDropdownList } from '../utils/utils';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { images } from './Images';
import { fontScalingFactor, windowWidth } from './CommonStyles';
import { useSelector } from 'react-redux';
import { colors } from './Colors';
import Entypo from 'react-native-vector-icons/Entypo';

const DropDownComponent = ({ value, onSetValue = (value) => { },
    idOfSelectedItem = (id) => { }, listToRender, placeholder, customStyle }) => {
    const goalsList = useSelector(state => state.main.userGoals)
    const [isFocus, setIsFocus] = useState(false);
    // console.log(listToRender);
    const renderCustomView = (item, index) => {
        return (
            <View
                style={styles.renderItem}>
                <Text style={{ fontSize: moderateScale(14) / fontScalingFactor, color: colors.black }}>{item.title}</Text>
            </View>
        )
    }
    
    return (

        <Dropdown
            style={[styles.dropdown(customStyle), isFocus && { borderColor: colors.black, }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={listToRender}
            maxHeight={scale(200)}
            labelField="title"
            valueField="title"
            placeholder={placeholder}
            // activeColor='red'
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                onSetValue(item.title);
                idOfSelectedItem(item.id)
                setIsFocus(false);
            }}
            renderItem={(item) => renderCustomView(item)}
            renderRightIcon={() => (
                <Image
                    style={styles.icon}
                    color={isFocus ? colors.buttonColor : 'black'}
                    source={images.blackDownArrow}
                    resizeMode='stretch'
                />
            )}
        />
    )
}

export default memo(DropDownComponent)

export const MultiSelectDropdown = ({ value, onSetValue = (value) => { }, idOfSelectedItem = (id) => { },
    listToRender, placeholder, customStyle }) => {
    return (
        <MultiSelect
            style={styles.dropdown(customStyle)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={listToRender}
            maxHeight={scale(200)}
            labelField="title"
            valueField="title"
            placeholder={placeholder}
            value={value}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={item => {
                console.log(item, "oppopopopoppppppopopopoopo");
                onSetValue(item);
            }}
            renderRightIcon={() => (
                <Image
                    style={styles.icon}
                    color={'black'}
                    source={images.blackDownArrow}
                    resizeMode='stretch'
                />
            )}
            renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity activeOpacity={0.8} onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.title}</Text>
                        <Entypo name="cross" size={scale(22)} color={colors.black} />
                    </View>
                </TouchableOpacity>
            )}

        />
    )
}

const styles = StyleSheet.create({
    dropdown: (customStyle) => {
        return {

            height: scale(40),
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: scale(10),
            width: windowWidth - scale(30),
            alignSelf: "center",

            ...customStyle
        }
    },
    icon: {
        marginRight: 5,
        height: scale(8),
        width: scale(12)
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: moderateScale(12) / fontScalingFactor,
    },
    placeholderStyle: {
        fontSize: moderateScale(12) / fontScalingFactor, color: colors.black
    },
    selectedTextStyle: {
        fontSize: moderateScale(11) / fontScalingFactor,
        color: colors.black,
        fontWeight: "400"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    renderItem: {
        minHeight: scale(30), marginVertical: verticalScale(2), backgroundColor: colors.white, justifyContent: "center",
        paddingHorizontal: 10,
    }
})