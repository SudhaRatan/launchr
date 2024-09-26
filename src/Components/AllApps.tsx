import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';

const AllApps = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onLongPress={() => (navigation.navigate as any)('Settings')}
      onPress={() => (navigation.navigate as any)('Search', {search: false})}
      style={{
        padding: 5,
        backgroundColor: '#80808080',
        alignSelf: 'center',
        bottom: 20,
        position: 'absolute',
        borderRadius: 10,
      }}>
      <Icon2 name="apps" color={'white'} size={40} />
    </TouchableOpacity>
  );
};

export default AllApps;
