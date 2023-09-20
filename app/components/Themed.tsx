import {ButtonTypes, CustomButtonProps,CustomInputProps } from '../../constants/Props';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';
import {TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import DropDownPicker, { DropDownPickerProps } from "react-native-dropdown-picker";

import Colors from '../../constants/Colors';
import { PropsWithoutRef } from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(props: { light?: string; dark?: string },colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
const theme = useColorScheme() ?? 'light';
const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
const theme = useColorScheme() ?? 'light';

  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color,fontFamily: 'UrbanistSemiBold' }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
const theme = useColorScheme() ?? 'light';

  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}


export function Button(props:CustomButtonProps) {
  const theme = useColorScheme() ?? 'light';
  var ButtonColor:string = props.disabled ? Colors[theme].g90:Colors[theme].primary;
  var TextColor:string = props.disabled ? Colors[theme].g60:Colors[theme]['static-white'];
  const ButtonType = props.type;
  ButtonColor = ButtonType == ButtonTypes.Ghost? Colors[theme].transparent:ButtonColor;
  TextColor = ButtonType == ButtonTypes.Ghost? Colors[theme].black:TextColor 
  return (
  <TouchableOpacity {...props} style={[{backgroundColor:ButtonColor},props.style]} className={`h-10 items-center justify-center mt-2 rounded-sm ${props.className}`}>
    <Text style={[{color:TextColor}]}>{props.title}</Text>
  </TouchableOpacity>
)
}

export function Input(props:CustomInputProps) {
const theme = useColorScheme() ?? 'light';

const BackgroundColor:string = props.editable == false ? Colors[theme].g90:Colors[theme].white;
const TextColor:string = props.editable == false ? Colors[theme].g60:Colors[theme].black;
return (
<View className='h-12 overflow-visible border-solid border-red-400'>
    <Text className='absolute top-[-2] z-10 text-gray-400 w-24 pl-2 text-center'>{props.title}</Text>
    <View className='h-[1px] top-[8px] left-2 border-solid border z-[5] w-24 absolute bg-red-600' style={[{borderColor:BackgroundColor}]}></View>
    <TextInput
    {...props}
    style={[{color:TextColor,backgroundColor:BackgroundColor,fontFamily:'UrbanistSemiBold'}]}
    className={`mt-auto border border-solid border-gray-300 h-10 rounded-sm pl-2 ${props.icon ? 'pr-10':'pr-2'}`}></TextInput>
    {props.icon ? 
    <TouchableOpacity onPress={props.iconPress}>
      <DefaultView className='h-10 w-10 absolute text-gray-600 right-0 bottom-0 items-center justify-center'>
        <MaterialIcons name={props.icon} color={TextColor}/>
      </DefaultView>
    </TouchableOpacity>
    :''
    }
</View>
)
}

export function Dropdown(props:PropsWithoutRef<DropDownPickerProps<any>>){
  const theme = useColorScheme() ?? 'light';
  const styles = StyleSheet.create(
    {
    dropdownPicker:{
      borderStyle:'solid',
      borderColor:Colors[theme].g90,
      backgroundColor:Colors[theme].white,
      padding:0,
      borderRadius:2,
    },
    dropDownContainerStyles:{
      borderColor:Colors[theme].g90,
      backgroundColor:Colors[theme].white,
      borderRadius:2,
    },
    listItemLabelStyles:{
      fontFamily:'UrbanistSemiBold',
      color:Colors[theme].black
    },
    placeholderStyles:{
      borderStyle:'solid',
      color:Colors[theme].black,
      borderWidth:0,
      fontFamily:'UrbanistSemiBold',
      padding:0,
      margin:0
    },
    searchContainerStyles:{
      padding:0,
      height:40,
      borderWidth:0,
      borderColor:Colors[theme].g90,
      backgroundColor:Colors[theme].white
    },
    searchTextInputStyles:{
      backgroundColor:Colors[theme].transparent,
      borderRadius:0,
      fontFamily:'UrbanistSemiBold',
      borderWidth:0
    },
    listMessageTextStyles:{
      fontFamily:'UrbanistSemiBold',
      color:Colors[theme].info,
    },
    selectedItemLabelStyle:{
      fontFamily:'UrbanistSemiBold',
      fontWeight: "bold",
      color:Colors[theme].red
    },
    selectedItemContainerStyle:{
      backgroundColor:Colors[theme].w96
    },
    arrowIconStyles:{
      
    }
  })
  return (
      <DropDownPicker
      theme={theme == 'light'  ?'LIGHT':'DARK'}
      style={styles.dropdownPicker}
      activityIndicatorColor={Colors[theme].primary}
      placeholderStyle={styles.placeholderStyles}
      dropDownContainerStyle={styles.dropDownContainerStyles}
      searchTextInputStyle={styles.searchTextInputStyles}
      searchContainerStyle={styles.searchContainerStyles}
      selectedItemContainerStyle={styles.selectedItemContainerStyle}
      selectedItemLabelStyle={styles.selectedItemLabelStyle}
      listItemLabelStyle={styles.listItemLabelStyles}
      arrowIconStyle={styles.arrowIconStyles}
      listMessageTextStyle={styles.listMessageTextStyles}
      zIndex={1000}
      zIndexInverse={3000}
      {...props}
    />
  )
}

