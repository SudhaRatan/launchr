import {NativeModules} from 'react-native';

// Extract the type of the NativeModules.AppInfoLauncher object
// for better type safety and clarity.
interface AppInfoLauncherInterface {
  launch(packageName: string): void;
}

// Use a type assertion to ensure that NativeModules.AppInfoLauncher
// conforms to the AppInfoLauncherInterface.
const AppInfoLauncher =
  NativeModules.AppInfoLauncher as AppInfoLauncherInterface;

export default AppInfoLauncher;
