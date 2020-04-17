import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as evaDark } from '@eva-design/eva';
import { AppContainer } from './src/navigations';

import { StatusBar } from 'react-native';
import { default as customTheme } from './src/themes/index.json';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { stopTimer } from './src/store/actions';
import { store, persistor } from './src/store';

import { establishNotifications, cancelAllNotifications } from './src/util/notifications';

export default function App() {
  StatusBar.setBarStyle('light-content');

  establishNotifications(() => {
    cancelAllNotifications();
    store.dispatch(stopTimer());
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={{...evaDark, ...customTheme}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </>
  );
}