import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface Battery {
  percentage: number;
  isCharging: boolean;
}

const BatteryIcon = ({percentage, isCharging}: Battery) => {
  const batteryFillStyle = {
    width: `${percentage}%`,
    backgroundColor: isCharging ? 'green' : 'white',
  } as ViewStyle;

  return (
    <View style={styles.batteryContainer}>
      <View style={styles.batteryBody}>
        <View style={[styles.batteryFill, batteryFillStyle]} />
      </View>
      <View style={styles.batteryTip} />
    </View>
  );
};

const styles = StyleSheet.create({
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryBody: {
    width: 24,
    height: 15,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
  },
  batteryTip: {
    width: 2,
    height: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default BatteryIcon;
