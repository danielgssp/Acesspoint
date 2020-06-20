import {Alert, ToastAndroid} from 'react-native';

export function dialogClearLog(setLog) {
  Alert.alert(
    'Clear Terminal',
    'Do you really want to clear messages from the terminal ?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setLog([])},
    ],
    {cancelable: false},
  );
}

export function toastAndroid(msg) {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
