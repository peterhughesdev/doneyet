import React from 'react';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SideDrawer } from '../components/side-drawer';
import { HomeScreen } from '../scenes/home';
import { TimerScreen } from '../scenes/timer';

const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
    return (
        <MainStack.Navigator headerMode="none" initialRouteName="Root" mode="card">
            <MainStack.Screen name="Root" component={HomeScreen} />
        </MainStack.Navigator>
    );
};

const RootStackScreen = () => {
    return (
        <RootStack.Navigator headerMode="none" initialRouteName="Root" mode="modal" >
            <RootStack.Screen name="Root" component={MainStackScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Timer" component={TimerScreen} options={{ 
                cardOverlayEnabled: true,
                cardStyle: {
                    backgroundColor: 'transparent',
                    opacity: 0.9
                },
                cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
            }}/>
        </RootStack.Navigator>
    )
}

const Root = gestureHandlerRootHOC(RootStackScreen);

export const AppContainer = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Main" drawerContent={(props) => <SideDrawer {...props} />}>
                    <Drawer.Screen name="Main" component={Root} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}