import {writeLog} from './LogService';
import {config} from '../utils/config';
import TcpSocket from 'react-native-tcp-socket';

class TCPService {
  constructor() {
    this.server;
  }

  close() {
    this.server = null;
  }

  open(setLog) {
    this.server = TcpSocket.createServer((socket) => {
      console.log('server connected on ' + JSON.stringify(socket.address()));

      socket.on('data', (data) => {
        const logData = data.toString();
        console.log('Server Received: ' + data);
        setLog((old) => [logData, ...old]);
        writeLog(logData);
      });

      socket.on('error', (error) => {
        console.log('An error ocurred with client socket ', error);
      });

      socket.on('close', (error) => {
        console.log('Closed connection with ', socket.address());
      });

      socket.write('ok');
    }).listen({port: config.serverPort, host: config.serverHost}, (address) => {
      console.log('opened server on ' + JSON.stringify(address));
    });
  }
}

export default new TCPService();
