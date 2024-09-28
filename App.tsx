import 'react-native-gesture-handler';
import {Pressable, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import Home from './src/Screens/Home';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native';
import Search from './src/Screens/Search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppStore} from './src/Stores/InstalledAppsStore';
import Settings from './src/Screens/Settings';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          cardStyle: {
            marginTop: StatusBar.currentHeight,
            flex: 1,
          },
          presentation: 'card',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            cardStyle: {
              marginTop: 0,
            },
            headerStyle: {
              backgroundColor: '#80808080',
              elevation: 0,
            },
            headerTitleStyle: {color: 'white'},
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <Pressable
                onPress={onPress}
                android_ripple={{borderless: false}}
                style={{paddingVertical: 10, paddingHorizontal: 20}}>
                <Icon size={20} color={'white'} name="arrow-back-ios" />
              </Pressable>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
