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
    ActivityIndicator,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
    Header
} from './../Header'

import { MonthExpenses } from '../MonthExpense';

import { CategoriesPieChart } from '../CategoriesPieChart';
import { CategoriesChart } from '../CategoriesChart';

import Tabs from 'react-native-tabs';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';

export function Reports(): React.JSX.Element {

    const [page, setPage] = useState("first")


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Tabs selected={page} style={{ backgroundColor: 'white' }}
                    selectedStyle={{ color: 'red' }} onSelect={el => setPage({ page: el.props.name })}>
                    <Tab name="first" style={{ backgroundColor: 'white' }}>First</Tab>
                    <Tab name="second" style={{ backgroundColor: 'white' }}>Second</Tab>
                    <Tab name="third" style={{ backgroundColor: 'white' }}>Third</Tab>
                    <Tab name="fourth" style={{ backgroundColor: 'white' }}>Fourth</Tab>
                </Tabs>
                <Text style={styles.welcome}>
                    Welcome to React Native
                </Text>
                <Text style={styles.instructions}>
                    Selected page: {page}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});