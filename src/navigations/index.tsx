import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../scenes/home';

type RootParams = {
    "Home": undefined
};

const RootStack = createStackNavigator<RootParams>()

export const AppContainer = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Home" >
                <RootStack.Screen name="Home" component={HomeScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

