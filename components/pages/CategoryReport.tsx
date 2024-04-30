import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
const Stack = createStackNavigator();

import { HomeScreen } from '../HomeComponent';

export function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                gestureEnabled: true,
                headerTitle: '',
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: {
                    height: 0, // Specify the height of your custom header
                    backgroundColor: '#000',
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Awesome app',
                }}
            />
            <Stack.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    title: 'My profile',
                }}
            />
            <Stack.Screen
                name="Settings"
                component={HomeScreen}
                options={{
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
}