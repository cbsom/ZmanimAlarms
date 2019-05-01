/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Main from './App/GUI/Main';
import { name as appName } from './app.json';
import { configureNotifier } from './App/Code/Notifications';

configureNotifier();
AppRegistry.registerComponent(appName, () => Main);
