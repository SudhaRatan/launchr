import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

interface AppInterface {
  onPress?: () => void;
  onLongPress?: () => void;
  index: number;
  icon: string;
  label: string;
  lastIndex: number;
  marginCondition?: number;
  textLines?: number;
  direction?: 'row' | 'column';
}

const AppComponent = ({
  onLongPress,
  onPress,
  icon,
  label,
  marginCondition,
  textLines,
  direction = 'row',
}: AppInterface) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      android_ripple={{borderless: false}}
      style={{
        flexDirection: direction,
        gap: 20,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#00000050',
        flex: 1,
        marginRight: !marginCondition ? 0 : marginCondition,
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
        numberOfLines={textLines ? textLines : 2}>
        {label}
      </Text>
    </Pressable>
  );
};

export default AppComponent;
