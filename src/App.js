import React, {useState} from 'react';
import {config} from './utils/config';
import {version} from '../package.json';
import TCPService from './service/TCPService';
import KeepAwake from 'react-native-keep-awake';
import {getConnectionInfo} from 'react-native-wifi-p2p';
import {dialogClearLog, toastAndroid} from './utils/dialog';
import ForegroundService from './service/ForegroundService';
import AccessPointService from './service/AccessPointService';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

function App() {
  const [log, setLog] = useState([]);
  const [statServer, setStatServer] = useState(false);
  const [passWifi, setPassWifi] = useState('not connected');
  const [addressWifi, setAddressWifi] = useState('not connected');

  function initWifiDirect() {
    setStatServer(true);
    AccessPointService.start();
    AccessPointService.onListenerConnectionInfo(setAddressWifi);
    AccessPointService.onCreateGroup(setPassWifi);
    TCPService.open(setLog);
    ForegroundService.startForegroundService();
  }

  async function closeWifiDirect() {
    const {groupFormed} = await getConnectionInfo();

    if (groupFormed) {
      AccessPointService.onUnsubscribeConnectionInfo();
      AccessPointService.onRemoveGroup();
      ForegroundService.stopForegroundService();
      TCPService.close();
      setStatServer(false);
      setAddressWifi('not connected');
      setPassWifi('not connected');
      toastAndroid('Server desconnected!');
    }
  }

  return (
    <View style={styles.container}>
      <KeepAwake />
      <View style={styles.containerNetInfo}>
        <Text style={styles.titNetInfo}>Network Information</Text>
        <View style={styles.row}>
          <Text>Start Port: </Text>
          <Text style={styles.txtNetInfo}>{config.serverPort}</Text>
        </View>
        <View style={styles.row}>
          <Text>IP Address: </Text>
          <Text style={styles.txtNetInfo}>{addressWifi}</Text>
        </View>
        <View style={styles.row}>
          <Text>Password: </Text>
          <Text style={styles.txtNetInfo}>{passWifi} </Text>
        </View>
      </View>

      <View style={styles.containerTerminalText}>
        <View style={styles.containerTitleTerminal}>
          <TouchableOpacity onLongPress={() => toastAndroid(version)}>
            <Text style={styles.titTerminal}>Terminal Log</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => dialogClearLog(setLog)}>
          <Image
            style={styles.icon_clear}
            source={require('./assets/icon_clear.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.containerTerminal}>
          {log.map((it, index) => {
            if (index <= 999) {
              return (
                <Text style={styles.txtTerminal} key={index}>
                  $ {it}
                </Text>
              );
            }
          })}
        </View>
      </ScrollView>

      <View style={styles.containerManagementNetwork}>
        <Button
          disabled={statServer}
          color="#27AE60"
          title="open network"
          onPress={() => initWifiDirect()}
        />
        <Button
          color="#FF0000"
          title="close network"
          onPress={() => closeWifiDirect()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  icon_clear: {
    width: 30,
    height: 30,
  },
  containerNetInfo: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  txtNetInfo: {
    color: '#30C0FA',
  },
  containerTitleTerminal: {
    flex: 0.6,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  containerTerminalText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerTerminal: {
    flex: 1,
    marginHorizontal: 20,
  },
  titNetInfo: {
    color: '#626262',
    fontWeight: '500',
  },
  txtTerminal: {
    color: '#32CD32',
    fontSize: 18,
  },
  titTerminal: {
    fontSize: 24,
    color: '#626262',
  },
  containerManagementNetwork: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default App;
