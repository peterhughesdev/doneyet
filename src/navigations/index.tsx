import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../scenes/home';
import { TimersScreen } from '../scenes/timers';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import colours from '../styles/colours.json';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
    activeTintColor: colours.background,
    inactiveTintColor: colours.background,
    style: {
        backgroundColor: colours.accent
    }
}

function Root() {
    return (
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name={focused ? 'clockcircle' : 'clockcircleo'} size={size} color={color} />
          ),
        }}/>
        <Tab.Screen name="Queue" component={TimersScreen} options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'ios-list-box' : 'ios-list'} size={size} color={color} />
          ),
        }}/>
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

