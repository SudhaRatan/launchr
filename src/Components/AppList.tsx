import {Text, FlatList, Pressable, Image} from 'react-native';
import React from 'react';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

type AppListType = {
  apps: AppDetail[] | undefined;
};

const AppList = ({apps}: AppListType) => {
  const lauchApp = (packageName: string) => {
    RNLauncherKitHelper.checkIfPackageInstalled(packageName).then(
      isInstalled => {
        if (isInstalled) RNLauncherKitHelper.launchApplication(packageName);
      },
    );
  };

  return (
    <FlatList
      style={{}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 10}}
      keyExtractor={(item, index) => index.toString()}
      data={apps}
      renderItem={({item: {icon, label, packageName}}) => {
        return (
          <Pressable
            onPress={() => lauchApp(packageName)}
            android_ripple={{borderless: false}}
            style={{
              flexDirection: 'row',
              gap: 20,
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#00000050',
            }}>
            <Image
              source={{uri: 'data:image/png;base64,' + icon}}
              width={60}
              height={60}
            />
            <Text style={{fontWeight: 500, fontSize: 18, color: 'white'}}>
              {label}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default AppList;
