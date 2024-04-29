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

type MonthExpensesProps = {
    total: string;
};

export function MonthExpenses(props: MonthExpensesProps): React.JSX.Element {
    const now = new Date()
    const month = now.getMonth() + 1

    const year = now.getFullYear()

    const monthes = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    }

    const currentMonth = `${monthes[month]} ${year}`
    return (
        <SafeAreaView style={styles.month}>
            <Text style={styles.currentMonth}>{currentMonth}</Text>

            <Text style={styles.sum}>{parseFloat(props.total).toLocaleString(
                'ru-RU',
                { style: 'currency', currency: 'RUB' }
            )}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    month: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 18,
        marginLeft: 18,
        marginTop: 26
    },
    sum: {
        fontSize: 48,
        color: '#eee',
        fontWeight: '600',
        marginTop: 4,
        fontFamily: 'Onest-SemiBold'
    },
    currentMonth: {
        color: '#888',
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Onest-SemiBold',
        marginBottom: -10
    }
});