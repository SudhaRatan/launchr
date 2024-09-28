import {RNLauncherKitHelper} from 'react-native-launcher-kit';
import {useAppStore} from '../Stores/InstalledAppsStore';

const fetchApps = useAppStore.getState().fetchApps;

export const lauchApp = (packageName: string) => {
  RNLauncherKitHelper.checkIfPackageInstalled(packageName).then(isInstalled => {
    if (isInstalled) RNLauncherKitHelper.launchApplication(packageName);
    else fetchApps();
  });
};
