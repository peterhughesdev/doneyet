import React from 'react';

import { View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen } from '../scenes/home';
import { TimersScreen } from '../scenes/timers';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabBar = () => {
    return (
        <View style={{ flexDirection: 'row' }} />
    );
}

function Root() {
    return (
      <Tab.Navigator tabBar={props => <TabBar />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Timers" component={TimersScreen} />
      </Tab.Navigator>
    );
}

export const AppContainer = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator headerMode="none" initialRouteName="Root" >
                    <Stack.Screen name="Root" component={Root} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

