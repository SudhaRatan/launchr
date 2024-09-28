import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {InstalledApps, RNLauncherKitHelper} from 'react-native-launcher-kit';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import SearchBar from '../Components/SearchBar';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import {useSettingsStore} from '../Stores/SettingsStore';
import {useShallow} from 'zustand/shallow';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppStore} from '../Stores/InstalledAppsStore';
import AppComponent from '../Components/AppComponent';
import baseStyles from '../Styles/baseStyles';
import {lauchApp} from '../Utils/AppFunctions';
import Clock from '../Components/Clock';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const [apps, setApps] = useState<AppDetail[]>();

  const {favouriteApps, leftSwipeApp, rightSwipeApp} = useSettingsStore(
    useShallow(state => ({
      favouriteApps: state.favouriteApps,
      leftSwipeApp: state.leftSwipeApp,
      rightSwipeApp: state.rightSwipeApp,
    })),
  );

  const appss = useAppStore(state => state.apps);

  const leftAnim = useSharedValue(0);
  const rightAnim = useSharedValue(0);
  const swipeUpAnim = useSharedValue(0);

  const GetInstalledApps = () => {
    setApps(InstalledApps.getSortedApps());
  };

  const openSettings = () => {
    (navigation.navigate as any)('Settings');
  };

  useEffect(() => {
    GetInstalledApps();
  }, []);

  const {width, height} = Dimensions.get('screen');
  const swipeThreshold = width / 5;
  const iconWidth = 40;

  const pan = Gesture.Pan()
    .onUpdate(e => {
      leftAnim.value = e.translationX;
      rightAnim.value = e.translationX;
      swipeUpAnim.value = e.translationY;
    })
    .onEnd(e => {
      if (e.translationX >= swipeThreshold && leftSwipeApp) {
        RNLauncherKitHelper.launchApplication(leftSwipeApp);
      } else if (e.translationX <= -swipeThreshold && rightSwipeApp) {
        RNLauncherKitHelper.launchApplication(rightSwipeApp);
      } else if (e.translationY <= -swipeThreshold) {
        navigation.navigate('Search', {search: false});
      }
      leftAnim.value = withTiming(0, {duration: 200});
      rightAnim.value = withTiming(0, {duration: 200});
      swipeUpAnim.value = withTiming(0, {duration: 200});
    })
    .runOnJS(true);

  const leftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            leftAnim.value,
            [0, swipeThreshold],
            [-iconWidth, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      width: interpolate(
        leftAnim.value,
        [0, swipeThreshold],
        [0, iconWidth],
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        leftAnim.value,
        [0, swipeThreshold],
        [0, iconWidth],
        Extrapolation.CLAMP,
      ),
    };
  });

  const rightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            rightAnim.value,
            [0, -swipeThreshold],
            [iconWidth, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      width: interpolate(
        rightAnim.value,
        [0, -swipeThreshold],
        [0, iconWidth],
        Extrapolation.CLAMP,
      ),
      height: interpolate(
        rightAnim.value,
        [0, -swipeThreshold],
        [0, iconWidth],
        Extrapolation.CLAMP,
      ),
    };
  });

  const swipeUpStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            swipeUpAnim.value,
            [0, -100],
            [0, -40],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            swipeUpAnim.value,
            [0, -100],
            [1, 1.5],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View style={{flex: 1, padding: 10, gap: 10}}>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: '#80808080',
                borderRadius: 20,
              }}
              onPress={openSettings}>
              <Icon name="settings" color={'white'} size={24} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Clock />
          </View>
          <ScrollView
            contentContainerStyle={{gap: 10}}
            style={{maxHeight: height / 2}}>
            {favouriteApps?.length > 0 ? (
              favouriteApps.map((item, index) => {
                const app = appss.find(i => i.packageName == item)!;
                if (app == null || app == undefined) {
                  return null;
                }
                return (
                  <AppComponent
                    icon={app.icon}
                    index={index}
                    label={app.label}
                    direction={'row'}
                    key={app.packageName}
                    marginCondition={0}
                    lastIndex={favouriteApps.length - 1}
                    onPress={() => {
                      lauchApp(app.packageName);
                    }}
                    textLines={1}
                  />
                );
              })
            ) : (
              <Text style={[baseStyles.textPrimary, {textAlign: 'center'}]}>
                Add your favourite apps from settings
              </Text>
            )}
          </ScrollView>
          <View style={{flex: 1}}></View>
          <SearchBar />
          <Animated.View
            style={[
              {position: 'absolute', bottom: 50, alignSelf: 'center'},
              swipeUpStyle,
            ]}>
            <Icon2
              size={30}
              style={{fontWeight: 'bold'}}
              name="chevron-up"
              color={'#808080'}
            />
          </Animated.View>
          {leftSwipeApp && (
            <Animated.Image
              source={{
                uri:
                  'data:image/png;base64,' +
                  appss?.find(i => i.packageName === leftSwipeApp)?.icon,
              }}
              width={iconWidth}
              height={iconWidth}
              style={[
                {
                  position: 'absolute',
                  top: '50%',
                  left: 10,
                  transform: [{translateX: -100}],
                  borderRadius: 10,
                },
                leftStyle,
              ]}
            />
          )}
          {rightSwipeApp && (
            <Animated.Image
              source={{
                uri:
                  'data:image/png;base64,' +
                  appss?.find(i => i.packageName === rightSwipeApp)?.icon,
              }}
              width={iconWidth}
              height={iconWidth}
              style={[
                {
                  position: 'absolute',
                  top: '50%',
                  right: 10,
                  transform: [{translateX: 100}],
                  borderRadius: 10,
                },
                rightStyle,
              ]}
            />
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Home;
