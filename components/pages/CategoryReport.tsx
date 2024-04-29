import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
    )
}

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
                    height: 40, // Specify the height of your custom header
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