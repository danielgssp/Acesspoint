import VIForegroundService from '@voximplant/react-native-foreground-service';

class ForegroundService {
  constructor() {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: true,
      importance: 4,
    };

    VIForegroundService.createNotificationChannel(channelConfig);
  }

  async startForegroundService() {
    const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Accesspoint Solinftec',
      text: '',
      icon: 'ic_notification',
      priority: 1,
    };

    try {
      await VIForegroundService.startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  }

  stopForegroundService() {
    VIForegroundService.stopService();
  }
}

export default new ForegroundService();
