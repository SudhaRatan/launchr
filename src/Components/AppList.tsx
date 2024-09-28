import {FlatList, View, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import {useAppStore} from '../Stores/InstalledAppsStore';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AndroidOpenSettings from 'react-native-android-open-settings';
import AppInfoLauncher from '../Utils/AppInfoLauncher';
import AppComponent from './AppComponent';
import {lauchApp} from '../Utils/AppFunctions';

type AppListType = {
  apps: AppDetail[] | undefined;
};

const AppList = ({apps}: AppListType) => {
  const setSearch = useAppStore(state => state.setSearch);
  const fetchApps = useAppStore(state => state.fetchApps);
  const navigation = useNavigation();

  const loading = useAppStore(state => state.loading);

  const length = apps?.length;

  const openAppInfo = (packageName: string) => {
    AppInfoLauncher.launch(packageName);
  };

  useEffect(() => {
    if (apps?.length === 1) {
      setSearch('');
      Keyboard.dismiss();
      RNLauncherKitHelper.launchApplication(apps[0].packageName);
    }
  }, [apps]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            fetchApps();
          }}
        />
      }
      numColumns={2}
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
      keyExtractor={(item, index) => index.toString()}
      data={apps}
      ListFooterComponent={<View style={{width: 1, height: 60}} />}
      renderItem={({item: {icon, label, packageName}, index}) => {
        return (
          <AppComponent
            icon={icon}
            index={index}
            label={label}
            onPress={() => {
              navigation.goBack();
              lauchApp(packageName);
            }}
            onLongPress={() => openAppInfo(packageName)}
            lastIndex={length! - 1}
            marginCondition={(index % 2 || index === length! - 1) == 0 ? 10 : 0}
          />
        );
      }}
    />
  );
};

export default AppList;
