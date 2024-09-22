import {
  Text,
  FlatList,
  Pressable,
  Image,
  View,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import {useAppStore} from '../Stores/InstalledAppsStore';
import {Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AndroidOpenSettings from 'react-native-android-open-settings';

type AppListType = {
  apps: AppDetail[] | undefined;
};

const AppList = ({apps}: AppListType) => {
  const setSearch = useAppStore(state => state.setSearch);
  const navigation = useNavigation();

  const lauchApp = (packageName: string) => {
    navigation.goBack();
    RNLauncherKitHelper.checkIfPackageInstalled(packageName).then(
      isInstalled => {
        if (isInstalled) RNLauncherKitHelper.launchApplication(packageName);
      },
    );
  };

  const openAppInfo = (packageName: string) => {
    // Linking.sendIntent('android.settings.APPLICATION_DETAILS_SETTINGS', [
    //   {
    //     key: 'android.provider.extra.APP_PACKAGE',
    //     value: packageName,
    //   },
    // ]).catch(err => console.error('Could not open app settings', err));
    // Linking.openURL(`android-app://${packageName}`);
    const intent = 'android.settings.APPLICATION_DETAILS_SETTINGS';
    const uri = `package:${packageName}`;
    Linking.sendIntent(intent);
  };

  useEffect(() => {
    if (apps?.length === 1) {
      setSearch('');
      Keyboard.dismiss();
      // navigation.goBack();
      RNLauncherKitHelper.launchApplication(apps[0].packageName);
    }
  }, [apps]);

  return (
    <FlatList
      numColumns={2}
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
      keyExtractor={(item, index) => index.toString()}
      data={apps}
      ListFooterComponent={<View style={{width: 1, height: 60}} />}
      renderItem={({item: {icon, label, packageName}, index}) => {
        return (
          <Pressable
            onPress={() => lauchApp(packageName)}
            onLongPress={() => {
              openAppInfo(packageName);
            }}
            android_ripple={{borderless: false}}
            style={{
              flexDirection: 'row',
              gap: 20,
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#00000050',
              flex: 1,
              marginRight: index % 2 == 0 ? 10 : 0,
              overflow: 'hidden',
              borderRadius: 10,
            }}>
            <Image
              source={{uri: 'data:image/png;base64,' + icon}}
              width={40}
              height={40}
            />
            <Text
              style={{
                fontWeight: 500,
                fontSize: 14,
                color: 'white',
                flex: 1,
              }}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {label}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default AppList;
