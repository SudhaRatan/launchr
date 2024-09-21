import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppList from '../Components/AppList';
import SearchBar from '../Components/SearchBar';

const Home = () => {
  const [apps, setApps] = useState<AppDetail[]>();

  const GetInstalledApps = () => {
    setApps(InstalledApps.getSortedApps());
  };

  const openSettings = () => {
    RNLauncherKitHelper.goToSettings();
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
        <Text style={{fontWeight: 600, fontSize: 24}}>Home</Text>
        <TouchableOpacity onPress={openSettings}>
          <Icon name="settings" size={28} />
        </TouchableOpacity>
      </View>

      {/* <AppList apps={apps} /> */}

      <SearchBar />
    </View>
  );
};

export default Home;
