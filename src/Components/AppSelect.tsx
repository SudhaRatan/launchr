import {
  View,
  Text,
  Modal,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import baseStyles from '../Styles/baseStyles';
import {useAppStore} from '../Stores/InstalledAppsStore';
import AppList from './AppList';
import AppComponent from './AppComponent';
import AppSelectComponent from './AppSelectComponent';
import {useSettingsStore} from '../Stores/SettingsStore';
import {useShallow} from 'zustand/shallow';
import {BlurView} from '@react-native-community/blur';

interface AppSelectInterface {
  visible: boolean;
  close: () => void;
  type: 'left' | 'right' | 'fav';
}

const AppSelect = ({close, visible, type}: AppSelectInterface) => {
  const apps = useAppStore(state => state.apps);
  const fetchApps = useAppStore(state => state.fetchApps);
  const loading = useAppStore(state => state.loading);
  const length = apps?.length;

  const {
    favouriteApps,
    setLeftSwipeApp,
    setRightSwipeApp,
    setFavouriteApps,
    leftSwipeApp,
    rightSwipeApp,
  } = useSettingsStore(
    useShallow(state => ({
      favouriteApps: state.favouriteApps,
      setLeftSwipeApp: state.setLeftSwipeApp,
      setRightSwipeApp: state.setRightSwipeApp,
      setFavouriteApps: state.setFavouriteApps,
      leftSwipeApp: state.leftSwipeApp,
      rightSwipeApp: state.rightSwipeApp,
    })),
  );

  const {width, height} = Dimensions.get('screen');

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={close}>
      <BlurView
        style={[{width, height}, {position: 'absolute'}]}
        blurAmount={20}
        blurRadius={10}></BlurView>
      <View
        style={{
          // backgroundColor: '#ffffff80',
          flex: 1,
          padding: 20,
          gap: 10,
        }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                fetchApps();
              }}
            />
          }
          numColumns={3}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 10}}
          keyExtractor={(item, index) => index.toString()}
          data={apps}
          renderItem={({item: {icon, label, packageName}, index}) => {
            return (
              <AppSelectComponent
                favApps={favouriteApps}
                type={type}
                icon={icon}
                index={index}
                label={label}
                length={length}
                packageName={packageName}
                onPress={() => {
                  if (type === 'left') {
                    setLeftSwipeApp(packageName);
                    close();
                  } else if (type === 'right') {
                    setRightSwipeApp(packageName);
                    close();
                  } else if (type === 'fav') {
                    if (!favouriteApps.find(i => i === packageName)) {
                      setFavouriteApps!([...favouriteApps, packageName]);
                    } else {
                      setFavouriteApps!(
                        favouriteApps.filter(i => i != packageName),
                      );
                    }
                  }
                }}
              />
            );
          }}
        />
        <TouchableOpacity onPress={close} style={{alignSelf: 'flex-end'}}>
          <Text style={baseStyles.textPrimary}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AppSelect;
