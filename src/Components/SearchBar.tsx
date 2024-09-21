import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSharedValue} from 'react-native-reanimated';

const SearchBar = () => {
  const animVal = useSharedValue(0);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#80808080',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 30,
        bottom: 20,
        gap: 5,
        alignSelf: 'center',
      }}>
      <Icon name="search" size={20} color={'white'} />
      <Text style={{color: 'white'}}>Search</Text>
    </TouchableOpacity>
  );
};

export default SearchBar;
