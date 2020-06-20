import RNFS from 'react-native-fs';
import {formated} from './DateService';

const filePath = RNFS.DownloadDirectoryPath + '/logs';
const yearFolderPath = `${filePath}/${formated.year}`;
const monthFolderPath = `${filePath}/${formated.year}/${formated.month}`;
const logPath = `${filePath}/${formated.year}/${formated.month}/${formated.day}.txt`;

async function createLogFolder() {
  let existYearFolder = await RNFS.exists(yearFolderPath);
  let existMonthFolder = await RNFS.exists(monthFolderPath);

  if (existYearFolder === false) {
    existYearFolder = true;
    RNFS.mkdir(yearFolderPath).catch((err) => {
      console.log(err.message);
    });

    if (existMonthFolder === false) {
      existMonthFolder = true;
      RNFS.mkdir(monthFolderPath).catch((err) => {
        console.log(err.message);
      });
    }
  }

  return {existYearFolder, existMonthFolder};
}

export async function writeLog(log) {
  const createdLogFolder = await createLogFolder();
  const hour = new Date().toLocaleTimeString('pt-BR');

  if (createdLogFolder.existYearFolder && createdLogFolder.existMonthFolder) {
    RNFS.appendFile(logPath, `${hour}[LOG] - ${log}\n`, 'utf8').catch((err) => {
      console.log(err.message);
    });
  }
}
