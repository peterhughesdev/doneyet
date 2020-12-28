import * as Notifications from 'expo-notifications';

import * as Permissions from './permissions';

export const establishNotifications = async (cb: () => void ) => {
    await Permissions.registerForUserFacingNotificationsAsync();

    await Notifications.setNotificationCategoryAsync('repeating', [{
        identifier: 'stopRepeating',
        buttonTitle: 'Stop timer',
        options: {
            isDestructive: true,
            isAuthenticationRequired: false,
        }
    }]);

    Notifications.addNotificationResponseReceivedListener(response => {
        if (response.actionIdentifier === 'stopRepeating') {
            cb();
        }
    });
}

export const scheduleNotification = async (seconds: number, repeat: boolean, title: string, body: string) => {
    const notification = {
        content: {
            title,
            body,
            data: {
                time: seconds
            },
            categoryIdentifier: 'repeating'
        },
        trigger: {
            seconds,
            repeat
        }
    };

    return Notifications.scheduleNotificationAsync(notification);
}

export const cancelNotification = async (registration: string) => {
    return Notifications.cancelScheduledNotificationAsync(registration);
}

export const cancelAllNotifications = async () => {
    return Notifications.cancelAllScheduledNotificationsAsync();
}