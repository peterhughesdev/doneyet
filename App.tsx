import React from 'react';
import { Vibration } from 'react-native';
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as darkTheme } from '@eva-design/eva';

import { Notifications } from 'expo';

import *  as Permissions from './src/util/permissions';
import { AppContainer } from './src/navigations';

const theme = darkTheme;

export default class App extends React.Component {
  async componentDidMount() {
    await Permissions.registerForPushNotificationsAsync();
    await Permissions.registerForUserFacingNotificationsAsync();

    Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification: any) => {
    Vibration.vibrate([1000, 2000]);
    alert("Got notification");
    //Notifications.presentLocalNotificationAsync(notification);
  };

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <AppContainer />
        </ApplicationProvider>
      </>
    );
  }
}