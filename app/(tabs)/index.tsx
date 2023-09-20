import { Image,StyleSheet} from 'react-native';
import {Input,Button,View,Text,Dropdown } from '../components/Themed';
import { useState,useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useForm, Controller} from 'react-hook-form';

export default function TabOneScreen() {
const [passwordInputIcon,setPasswordInputIcon] = useState<keyof typeof MaterialIcons.glyphMap>("visibility");
const [passwordInputType,setPasswordInputType] = useState(true);
const handlePasswordInput =()=>{
  if(passwordInputIcon == 'visibility'){
    setPasswordInputIcon('visibility-off');
    setPasswordInputType(false);
  }else{
    setPasswordInputIcon('visibility');
    setPasswordInputType(true);
  }
}
const [value,onChangeText] = useState();
return (
    <View className='flex-1 items-center p-2 gap-2'>
      <View className='w-28 h-10 items-center justify-center'>
        <Image source={require('../../assets/images/icon.png')} resizeMode='contain' className='h-full'/>
      </View>
    <View className='flex-1 items-center'>

    </View>
    </View>
  );
}

