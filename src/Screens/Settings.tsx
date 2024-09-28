import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import baseStyles from '../Styles/baseStyles';
import AppSelect from '../Components/AppSelect';
import {useSettingsStore} from '../Stores/SettingsStore';
import {useShallow} from 'zustand/shallow';
import {useAppStore} from '../Stores/InstalledAppsStore';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';

const Settings = () => {
  const [visible, setVisible] = useState(false);

  const [selectType, setSelectType] = useState<'left' | 'right' | 'fav'>(
    'left',
  );

  const {favouriteApps, leftSwipeApp, rightSwipeApp} = useSettingsStore(
    useShallow(state => ({
      favouriteApps: state.favouriteApps,
      leftSwipeApp: state.leftSwipeApp,
      rightSwipeApp: state.rightSwipeApp,
    })),
  );

  const apps = useAppStore(state => state.apps);

  const open = (selType: 'left' | 'right' | 'fav') => {
    setSelectType(selType);
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1, padding: 10, gap: 10}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#80808080',
          padding: 20,
          borderRadius: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={[baseStyles.textPrimary, {fontSize: 18, fontWeight: 'bold'}]}>
          Left swipe app
        </Text>
        <TouchableOpacity onPress={() => open('left')}>
          {leftSwipeApp ? (
            <Image
              source={{
                uri:
                  'data:image/png;base64,' +
                  apps.find(i => i.packageName === leftSwipeApp)?.icon,
              }}
              width={40}
              height={40}
            />
          ) : (
            <Text style={baseStyles.textPrimary}>Select</Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#80808080',
          padding: 20,
          borderRadius: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={[baseStyles.textPrimary, {fontSize: 18, fontWeight: 'bold'}]}>
          Right swipe app
        </Text>
        <TouchableOpacity onPress={() => open('right')}>
          {rightSwipeApp ? (
            <Image
              source={{
                uri:
                  'data:image/png;base64,' +
                  apps.find(i => i.packageName === rightSwipeApp)?.icon,
              }}
              width={40}
              height={40}
            />
          ) : (
            <Text style={baseStyles.textPrimary}>Select</Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          gap: 20,
          backgroundColor: '#80808080',
          padding: 20,
          borderRadius: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              baseStyles.textPrimary,
              {fontSize: 18, fontWeight: 'bold'},
            ]}>
            Favourite apps
          </Text>
          <TouchableOpacity onPress={() => open('fav')}>
            <Text style={baseStyles.textPrimary}>Select</Text>
          </TouchableOpacity>
        </View>
        {favouriteApps?.length > 0 ? (
          <ScrollView
            horizontal
            contentContainerStyle={{gap: 30}}
            showsHorizontalScrollIndicator={false}>
            {favouriteApps.map((item, index) => {
              return (
                <Image
                  key={item}
                  source={{
                    uri:
                      'data:image/png;base64,' +
                      apps.find(i => i.packageName === item)?.icon,
                  }}
                  width={40}
                  height={40}
                />
              );
            })}
          </ScrollView>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          RNLauncherKitHelper.openSetDefaultLauncher();
        }}
        style={{
          backgroundColor: '#80808080',
          padding: 20,
          borderRadius: 10,
        }}>
        <Text
          style={[baseStyles.textPrimary, {fontSize: 18, fontWeight: 'bold'}]}>
          Set as default launcher
        </Text>
      </TouchableOpacity>
      <AppSelect type={selectType} close={close} visible={visible} />
    </ScrollView>
  );
};

export default Settings;
