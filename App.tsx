import 'react-native-gesture-handler';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import Home from './src/Screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />
      <View style={style.container}>
        <Home />
      </View>
    </>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
