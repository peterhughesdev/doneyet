import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
            <RootStack.Navigator initialRouteName="Home" headerMode="none" >
                <RootStack.Screen name="Home" component={HomeScreen} />
            </RootStack.Navigator>
        </NavigationContainer>
        
    );
}

