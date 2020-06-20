import {PermissionsAndroid} from 'react-native';

const permissions = [
  'android.permission.ACCESS_FINE_LOCATION',
  'android.permission.READ_EXTERNAL_STORAGE',
  'android.permission.WRITE_EXTERNAL_STORAGE',
];

PermissionsAndroid.requestMultiple(permissions);
