import { Image} from 'react-native';
import { router} from 'expo-router';
import {Dropdown,View,Text,Input,Button } from '../components/Themed';
import { useState,useCallback,useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../../constants/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Division } from '../../constants/Types';
import { ButtonTypes } from '../../constants/Props';
import { RequestHandler } from '../../constants/Test';
import { Guid } from 'guid-typescript';
export default function Login(){

  const [passwordInputIcon,setPasswordInputIcon] = useState<keyof typeof MaterialIcons.glyphMap>("visibility");
  const [passwordInputType,setPasswordInputType] = useState(true);
  const handlePasswordInput = () => {
    if(passwordInputIcon == 'visibility'){
      setPasswordInputIcon('visibility-off');
      setPasswordInputType(false);
    }else{
      setPasswordInputIcon('visibility');
      setPasswordInputType(true);
    }
  }

  const [divisionSelected,setDivisionSelected] = useState(false);
  const [divisionList,setDivisionList] = useState(Array<Division>);

  const [userName,setUserName] = useState();
  const [password,setPassword] = useState();
  
  const {setUser } = useAuth();

  const [serverListOpen, setServerListOpen] = useState(false);
  const [serverListValue, setServerListValue] = useState(null);
  const [serverList, setServerList] = useState([
    {label:'UAT',value:'uat'},
    {label:'PORTAL',value:'portal'}
  ]);
  const [loading, setLoading] = useState(false);
  const onServerListOpen = useCallback(() => {
  }, [])
  const onServerSelect=(item:object)=>{
  }

  const login = async()=>{
    console.log("test")
    let sessionId = Guid.create();
    let x = await RequestHandler.JSONRequest('POST','https://uat.faturaturka.com/am/api/sso/li?sessionId=' + sessionId,"super.ecbakas;5760094698bb86ac715ca412552b4260"); 
    console.log(x)
    if(typeof x != undefined){
      setDivisionSelected(true);
    }
  }
  const backToLogin=()=>{
    setDivisionSelected(false);
  }

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center p-3'>
        <View className='w-28 h-10 items-center justify-center'>
          <Image source={require('../../assets/images/icon.png')} resizeMode='contain' className='h-full'/>
        </View>
        {!divisionSelected ? 
        <View className='flex-1 justify-center bg-red-100 gap-y-2'>
          <Input title='Kullanıcı Adı' value={userName} defaultValue="super.ecbakas" icon='person-outline'/>
          <Input title='Şifre' value={password} secureTextEntry={passwordInputType} defaultValue="super.ecbakas" icon={passwordInputIcon} iconPress={handlePasswordInput}/>
                <Dropdown
                searchable={false}
                open={serverListOpen}
                value={serverListValue}
                items={serverList}
                setOpen={setServerListOpen}
                setValue={setServerListValue}
                setItems={setServerList}
                onSelectItem={onServerSelect}/>
          <Button title='Giriş Yap' onPress={login}/>
        </View>:
        <View className='w-full h-full flex-wrap justify-center items-center overflow-hidden p-0'>
          <DivisionList DivisionList={divisionList}/>
          <Button type={ButtonTypes.Ghost} title="Geri" onPress={backToLogin}/>
        </View>
        }
      </View>
    </SafeAreaView>
  );
}
export function DivisionList(props:{DivisionList:Array<Division>}){
  const [divisionListOpen, setDivisionListOpen] = useState(false);
  const [divisionListValue, setDivisionListValue] = useState(null);
  const [divisionList, setDivisionList] = useState<Array<Division>>([]);
  const [loading, setLoading] = useState(false);
  const ondivisionListOpen = useCallback(() => {
  }, [])
  const setOpen = ()=>{
    setDivisionListOpen(!divisionListOpen)
  }
  const setList =()=>{
    setDivisionList(props.DivisionList);
  }
  const onDivisionSelect=(item:object)=>{
    router.replace("/")
  }
  return (
      <Dropdown
          searchable={true}
          open={divisionListOpen}
          value={divisionListValue}
          items={divisionList}
          setOpen={setOpen}
          setValue={setDivisionListValue}
          setItems={setDivisionList}
          placeholder="İşyeri seçin"
          loading={loading}
          searchPlaceholder="İşyeri arayın.."
          onOpen={ondivisionListOpen}
          onSelectItem={onDivisionSelect}
      />
  );
}