import {DeviceEventEmitter, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../App';
import SearchBar from '../Components/SearchBar';
import AppList from '../Components/AppList';
import {useAppStore} from '../Stores/InstalledAppsStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Back from '../Components/Back';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
const Search = ({navigation, route: {params}}: Props) => {
  const apps = useAppStore(state => state.apps);
  const searchApp = useAppStore(state => state.searchApp);
  const setSearch = useAppStore(state => state.setSearch);

  useEffect(() => {
    setSearch('');
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 20, gap: 10}}>
      <SearchBar showSearch openSearch={params.search} />
      <AppList
        apps={apps?.filter(i =>
          i.label.toLowerCase().includes(searchApp.toLowerCase()),
        )}
      />
      <Back />
    </View>
  );
};

export default Search;
