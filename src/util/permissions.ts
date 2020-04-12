import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import { Notifications } from 'expo';

export const registerForUserFacingNotificationsAsync = async () => {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);

    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);

        if (permission.status !== 'granted') {
            alert('Failed to get permission for local notification!');
        }
      }
      
      return permission;
}

export const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        return await Notifications.getExpoPushTokenAsync();
    } else {
        alert('Must use physical device for Push Notifications');
    }
}