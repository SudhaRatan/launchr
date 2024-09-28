import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {RNLauncherKitHelper} from 'react-native-launcher-kit';
import BatteryIcon from './Battery';
import {BatteryStatus} from 'react-native-launcher-kit/typescript/Interfaces/battery';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus>({
    isCharging: false,
    level: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId1 = setInterval(async () => {
      setBatteryStatus(await RNLauncherKitHelper.getBatteryStatus());
    }, 2000); // Update every second

    return () => clearInterval(intervalId1);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString(undefined, options); // Format date nicely
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        RNLauncherKitHelper.openAlarmApp();
      }}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
        <Text style={styles.dateText}>{formatDate(time)}</Text>
        <BatteryIcon
          percentage={batteryStatus.level}
          isCharging={batteryStatus.isCharging}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Clock;
