import React, { useEffect, useState } from 'react';
// import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    SectionList,
    Image,
    Button,
    Alert,
    ActivityIndicator,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';

export function Header(): React.JSX.Element {
    return (
        <SafeAreaView style={styles.header}>
            <Image style={styles.avatar} source={require('./../assets/avatar.png')} />
            <View style={styles.flexVertical}>
                <Text style={styles.hello}>Привет</Text>
                <Text style={styles.name}>Никита К.</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',

    },
    avatar: {
        width: 44,
        height: 44,
        marginLeft: 18,
        marginTop: 18,
    },

    hello: {
        color: '#888',
        fontSize: 12
    },
    name: {
        color: '#eee',
        fontSize: 18,
        fontWeight: '500'
    },
    flexVertical: {
        marginLeft: 10,
        marginTop: 24,
        flexDirection: 'column',
    }
});