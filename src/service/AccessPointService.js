import {
  initialize,
  isSuccessfulInitialize,
  subscribeOnConnectionInfoUpdates,
  createGroup,
  removeGroup,
  getGroupPassphraseInfo,
  unsubscribeFromConnectionInfoUpdates,
  getConnectionInfo,
} from 'react-native-wifi-p2p';

class AccessPointService {
  start() {
    initialize();
    isSuccessfulInitialize().then((status) => console.log(status));
  }

  onListenerConnectionInfo(setAddressWifi) {
    subscribeOnConnectionInfoUpdates((info) =>
      setAddressWifi(info.groupOwnerAddress.hostAddress),
    );
  }

  onUnsubscribeConnectionInfo() {
    unsubscribeFromConnectionInfoUpdates((event) =>
      console.log('unsubscribeFromConnectionInfoUpdates', event),
    );
  }

  onCreateGroup(setPassWifi) {
    getConnectionInfo().then((info) => {
      if (info.groupFormed !== true) {
        createGroup()
          .then(() => {
            setTimeout(() => {
              getGroupPassphraseInfo().then((passphrase) =>
                setPassWifi(passphrase),
              );
            }, 1000);
          })
          .catch((err) =>
            console.error('Something gone wrong. Details: ', err),
          );
      }
    });
  }

  onRemoveGroup() {
    removeGroup()
      .then(() => console.log("Currently you don't belong to group!"))
      .catch((err) => console.error('Something gone wrong. Details: ', err));
  }
}

export default new AccessPointService();
