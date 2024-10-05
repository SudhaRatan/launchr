import {ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import AppComponent from './AppComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface AppSelectComponentInterface {
  index: number;
  icon: string;
  label: string;
  length: number;
  favApps: string[];
  packageName: string;
  type: 'left' | 'right' | 'fav';
  onPress: () => void;
}

const AppSelectComponent = ({
  icon,
  index,
  label,
  length,
  onPress,
  favApps,
  type,
  packageName,
}: AppSelectComponentInterface) => {
  const [checked, setChecked] = useState(
    type === 'fav'
      ? favApps
        ? favApps.find(i => i === packageName)
          ? true
          : false
        : false
      : false,
  );

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <AppComponent
        marginCondition={index % 3 != 2 && index !== length! - 1 ? 10 : 0}
        icon={icon}
        index={index}
        label={label}
        onPress={() => {
          if (favApps.length < 5 || checked) {
            setChecked(!checked);
            onPress();
          } else {
            ToastAndroid.show(
              'Cannot add more than 5 apps',
              ToastAndroid.SHORT,
            );
          }
        }}
        onLongPress={() => {}}
        lastIndex={length! - 1}
        textLines={1}
        direction="column"
      />
      <BouncyCheckbox
        onPress={(isChecked: boolean) => {
          setChecked(isChecked);
          onPress();
        }}
        isChecked={checked}
        style={{position: 'absolute', margin: 5}}
        fillColor="#5295F6"
      />
    </View>
  );
};

export default AppSelectComponent;
