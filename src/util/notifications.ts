import { Notifications } from 'expo';

import * as Permissions from './permissions';

export const establishNotifications = async (cb: () => void ) => {
    await Permissions.registerForUserFacingNotificationsAsync();

    await Notifications.createCategoryAsync('repeating', [{
        actionId: 'stopRepeating',
        buttonTitle: 'Stop timer',
        isDestructive: true,
        isAuthenticationRequired: false,
    }]);

    Notifications.addListener((notification: any) => {
        if (notification.actionId && notification.actionId === 'stopRepeating') {
            cb();
        }
    });
}

export const scheduleNotification = async (seconds: number, repeat: boolean, title: string, body: string) => {
    const notification = {
        title: title,
        body: body,
        data: {
            time: seconds
        },
        categoryId: 'repeating',
        ios: {
            sound: true,
            _displayInForeground: true
        }
    };

    return Notifications.scheduleNotificationWithTimerAsync(notification, {
        interval: seconds * 1000,
        repeat: repeat
    });
}

export const cancelNotification = async (registration: string) => {
    return Notifications.cancelScheduledNotificationAsync(registration);
}

export const cancelAllNotifications = async () => {
    return Notifications.cancelAllScheduledNotificationsAsync();
}