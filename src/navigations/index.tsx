import React from 'react';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '../scenes/home';
import { QueueScreen } from '../scenes/queue';

import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Colours } from '../styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
    activeTintColor: Colours.text,
    inactiveTintColor: Colours.paleWarm,
    style: {
        backgroundColor: Colours.accent
    }
}

// function Root() {
//     return (
//       <Tab.Navigator tabBarOptions={tabBarOptions}>
//         <Tab.Screen name="Home" component={HomeScreen} options={{
//           tabBarIcon: ({ focused, color, size }) => (
//             <AntDesign name={focused ? 'clockcircle' : 'clockcircleo'} size={size} color={color} />
//           ),
//         }}/>
//         <Tab.Screen name="Queue" component={QueueScreen} options={{
//           tabBarIcon: ({ focused, color, size }) => (
//             <Ionicons name={focused ? 'ios-list-box' : 'ios-list'} size={size} color={color} />
//           ),
//         }}/>
//       </Tab.Navigator>
//     );
// }

const Root = gestureHandlerRootHOC(HomeScreen);


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

