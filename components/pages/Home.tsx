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
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';

export function Home(): React.JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <MonthExpenses />
            <CategoriesPieChart />
            { //<CategoriesChart /> 
            }
        </SafeAreaView>
    );
}