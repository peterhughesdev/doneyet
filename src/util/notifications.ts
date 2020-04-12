import { Notifications } from 'expo';

export const scheduleNotification = async (seconds: number, repeat: boolean, title: string, body: string) => {
    const notification = {
        title: title,
        body: body,
        data: {
            time: seconds
        },
        ios: {
            sound: true,
            _displayInForeground: true
        }
    };

    Notifications.scheduleNotificationWithTimerAsync(notification, {
        interval: seconds * 1000,
        repeat: repeat
    });
}