/**
 * @format
 */

import App from './src/App';
import './src/utils/permission';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
