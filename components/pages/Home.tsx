import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
const Stack = createStackNavigator();

import { HomeScreen } from '../HomeComponent'
import { ExpensesList } from '../ExpensesList';


export function Home() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                gestureEnabled: true,
                headerMode: 'float',
                headerTintColor: 'white',
                headerStyle: {
                    height: 48, // Specify the height of your custom header
                    backgroundColor: '#000',
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Грустно',
                }}
            />
            <Stack.Screen
                name="Expenses"
                component={ExpensesList}
                options={{
                    title: 'Траты по категории',
                }}
            />
        </Stack.Navigator>
    );
}