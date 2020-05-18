import React from 'react';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SideDrawer } from '../components/side-drawer';
import { HomeScreen } from '../scenes/home';

const Root = gestureHandlerRootHOC(HomeScreen);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Main = () => {
    return (
        <Stack.Navigator headerMode="none" initialRouteName="Root" >
            <Stack.Screen name="Root" component={Root} />
        </Stack.Navigator>
    );
};

export const AppContainer = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Main" drawerContent={(props) => <SideDrawer {...props} />}>
                    <Drawer.Screen name="Main" component={Main} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

