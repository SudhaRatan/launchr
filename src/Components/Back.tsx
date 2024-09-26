import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '../Stores/InstalledAppsStore';

const Back = () => {
  const {width} = Dimensions.get('screen');
  const navigation = useNavigation();
  const setSearch = useAppStore(state => state.setSearch);

  return (
    <TouchableOpacity
      onPress={() => {
        setSearch('');
        navigation.goBack();
      }}
      activeOpacity={0.5}
      style={{
        position: 'absolute',
        height: 50,
        width: width,
        backgroundColor: '#00000090',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon name="arrow-back-ios" size={14} color={'white'} />
      <Text style={{fontWeight: 600, fontSize: 16, color: 'white'}}>HOME</Text>
    </TouchableOpacity>
  );
};

export default Back;
