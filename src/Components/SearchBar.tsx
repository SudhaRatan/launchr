import {
  Dimensions,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../Stores/InstalledAppsStore';

type SearchBarProps = {
  showSearch?: boolean;
  openSearch?: boolean;
};

const SearchBar = ({showSearch, openSearch}: SearchBarProps) => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('screen');

  const fetchApps = useAppStore(state => state.fetchApps);

  const InpRef = useRef<TextInput>(null);

  useEffect(() => {
    if (openSearch)
      setTimeout(() => {
        InpRef.current?.focus();
      }, 200);
  }, []);

  const search = useAppStore(state => state.searchApp);
  const setSearch = useAppStore(state => state.setSearch);

  return (
    <TouchableOpacity
      onPress={() => {
        if (!showSearch) {
          (navigation.navigate as any)('Search', {search: true});
        }
      }}
      activeOpacity={showSearch ? 1 : 0.5}
      style={{
        position: showSearch ? 'relative' : 'absolute',
        flexDirection: 'row',
        backgroundColor: '#80808080',
        paddingHorizontal: 10,
        paddingVertical: showSearch ? 0 : 6,
        borderRadius: showSearch ? 10 : 30,
        bottom: showSearch ? 'auto' : 20,
        gap: 5,
        alignSelf: showSearch ? 'flex-start' : 'center',
        alignItems: 'center',
      }}>
      <Icon name="search" size={showSearch ? 20 : 16} color={'white'} />
      {showSearch ? (
        <TextInput
          value={search}
          onChangeText={setSearch}
          ref={InpRef}
          placeholder="Search"
          placeholderTextColor={'#f0f0f0'}
          style={{
            color: 'white',
            fontSize: 16,
            flex: 1,
          }}
        />
      ) : (
        <Text style={{color: 'white', fontSize: 14}}>Search</Text>
      )}
    </TouchableOpacity>
  );
};

export default SearchBar;
