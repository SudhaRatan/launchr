import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface SettingsStore {
  launchAppImmediately: boolean;
  setLaunchAppImmediately: (val: boolean) => void;
  leftSwipeApp?: string | null;
  setRightSwipeApp: (packageName: string) => void;
  rightSwipeApp?: string | null;
  setLeftSwipeApp: (packageName: string) => void;
  favouriteApps: string[];
  setFavouriteApps?: (packageNames: string[]) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      launchAppImmediately: true,
      setLaunchAppImmediately: val => set({launchAppImmediately: val}),
      leftSwipeApp: null,
      setLeftSwipeApp: val => set({leftSwipeApp: val}),
      rightSwipeApp: null,
      setRightSwipeApp: val => set({rightSwipeApp: val}),
      favouriteApps: [],
      setFavouriteApps: val => set({favouriteApps: val}),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
