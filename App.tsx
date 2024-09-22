import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import Home from './src/Screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native';
import Search from './src/Screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppStore} from './src/Stores/InstalledAppsStore';
import Settings from './src/Screens/Settings';

const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

type SearchParams = {
  search?: boolean;
};

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Search: SearchParams;
};

const App = () => {
  const fetchApps = useAppStore(state => state.fetchApps);

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'light-content'}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // contentStyle: {
          //   marginTop: StatusBar.currentHeight,
          //   flex: 1,
          // },
          cardStyle: {
            marginTop: StatusBar.currentHeight,
            flex: 1,
          },
          presentation: 'card',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
