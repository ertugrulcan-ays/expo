import { useAuth } from '../../constants/AuthProvider';
import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native';
export default function TabTwoScreen(props:{children:any}) {
  const {user,setUser } = useAuth();
  return (
    <View>
        <Text>{user && user.name}</Text>
        <TouchableOpacity onPress={()=>setUser(null)}>
          <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}
