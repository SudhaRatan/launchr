import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import SearchBar from '../Components/SearchBar';
import AllApps from '../Components/AllApps';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [apps, setApps] = useState<AppDetail[]>();

  const GetInstalledApps = () => {
    setApps(InstalledApps.getSortedApps());
  };

  const openSettings = () => {
    // RNLauncherKitHelper.goToSettings();
    (navigation.navigate as any)('Settings');
  };

  useEffect(() => {
    GetInstalledApps();
  }, []);

  return (
    <View style={{flex: 1, padding: 10, gap: 10}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 24,
            backgroundColor: '#80808080',
            color: 'white',
            paddingVertical: 2,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
          Home
        </Text>
        <TouchableOpacity
          style={{padding: 5, backgroundColor: '#80808080', borderRadius: 20}}
          onPress={openSettings}>
          <Icon name="settings" color={'white'} size={24} />
        </TouchableOpacity>
      </View>
      {/* <AllApps /> */}
      <SearchBar />
    </View>
  );
};

export default Home;
