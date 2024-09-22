import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import {create} from 'zustand';
import {InstalledApps} from 'react-native-launcher-kit';

interface AppStore {
  apps: AppDetail[];
  loading: boolean;
  error: string | null;
  fetchApps: () => void;
  searchApp: string;
  setSearch: (text: string) => void;
}

export const useAppStore = create<AppStore>(set => ({
  apps: [],
  loading: false,
  error: null,
  fetchApps: () => {
    set({loading: true, error: null});
    try {
      const apps = InstalledApps.getSortedApps();
      set({apps, loading: false});
    } catch (error) {
      set({error: (error as Error).message, loading: false});
    }
  },
  searchApp: '',
  setSearch: val => set({searchApp: val}),
}));
