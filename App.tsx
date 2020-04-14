import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { AppContainer } from './src/navigations';

import { StatusBar } from 'react-native';
import { default as myTheme } from './src/themes/index.json';

const theme = darkTheme;

export default function App() {
  StatusBar.setBarStyle('light-content');

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppContainer />
      </ApplicationProvider>
    </>
  );
}