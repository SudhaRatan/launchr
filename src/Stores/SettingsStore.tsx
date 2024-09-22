import {create} from 'zustand';

interface SettingsStore {
  launchAppImmediately: boolean;
  setLaunchAppImmediately: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  launchAppImmediately: true,
  setLaunchAppImmediately: val => set({launchAppImmediately: val}),
}));
