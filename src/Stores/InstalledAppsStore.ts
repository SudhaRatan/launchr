import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';
import {create} from 'zustand';
import {InstalledApps} from 'react-native-launcher-kit';
import AppInfoLauncher from '../Utils/AppInfoLauncher';

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
      AppInfoLauncher.getApps()
        .then(apps => {
          var ap = JSON.parse(apps) as AppDetail[];
          const appss = ap.sort((a, b) =>
            a.label?.toLowerCase().localeCompare(b.label?.toLowerCase()),
          );
          set({apps: appss, loading: false});
        })
        .catch(e => {
          console.error(e);
          set({error: (e as Error).message, loading: false});
        });
    } catch (error) {
      set({error: (error as Error).message, loading: false});
    }
  },
  searchApp: '',
  setSearch: val => set({searchApp: val}),
}));
