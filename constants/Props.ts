import {ViewProps, TextInputProps,GestureResponderEvent, InputModeOptions, ButtonProps} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
export interface CustomInputProps extends TextInputProps{
    title:string,
    defaultValue?:string,
    secureTextEntry?:boolean,
    editable?:boolean,
    icon?:keyof typeof MaterialIcons.glyphMap,
    iconPress?:(event: GestureResponderEvent)=>void,
    inputMode?:InputModeOptions,
    props?:TextInputProps,
}
export enum ButtonTypes{
    Primary,Secondary,Ghost
} 
export interface CustomButtonProps extends ButtonProps{
    className?:string,
    style?:ViewProps,
    type?:ButtonTypes
}
export interface CustomDropdownProps{
    className?:string,
}