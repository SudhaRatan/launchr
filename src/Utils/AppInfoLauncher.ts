import {NativeModules} from 'react-native';
import {AppDetail} from 'react-native-launcher-kit/typescript/Interfaces/InstalledApps';

// Extract the type of the NativeModules.AppInfoLauncher object
// for better type safety and clarity.
interface AppInfoLauncherInterface {
  launch(packageName: string): void;
  getApps(): Promise<string>;
}

// Use a type assertion to ensure that NativeModules.AppInfoLauncher
// conforms to the AppInfoLauncherInterface.
const AppInfoLauncher =
  NativeModules.AppInfoLauncher as AppInfoLauncherInterface;

export default AppInfoLauncher;
