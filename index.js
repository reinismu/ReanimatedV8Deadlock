/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.log(`V8 version is ${global._v8runtime().version}`);

AppRegistry.registerComponent(appName, () => App);
