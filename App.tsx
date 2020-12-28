import React from 'react';

import { AppContainer } from './src/navigations';

import { StatusBar } from 'react-native';
import { default as customTheme } from './src/themes/index.json';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store';

import { establishNotifications, cancelAllNotifications } from './src/util/notifications';

export default function App() {
  StatusBar.setBarStyle('light-content');

  establishNotifications(() => {
    cancelAllNotifications();
  });

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
  );
}