import React from 'react';

import { AppContainer } from './src/navigations';

import { StatusBar } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store';

import { establishNotifications } from './src/util/notifications';
import { stopTimers } from './src/store/actions';

export default function App() {
  StatusBar.setBarStyle('light-content');

  establishNotifications(() => {
    store.dispatch(stopTimers());
  });

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
  );
}