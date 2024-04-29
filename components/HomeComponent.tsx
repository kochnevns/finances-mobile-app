import React, { useEffect, useLayoutEffect, useState } from 'react';
// import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
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

    const [totalExpenses, setTotalExpenses] = useState("");
    const [report, setReport] = useState({});

    async function fetchData() {
        const response = await fetch('http://89.111.174.31:8082/finances.Finances/Report', {
            method: 'POST',
            body: JSON.stringify({
                "type": "month"
            })
        })
            .catch((error) => {
                //Alert.alert('Ошибка', error.message + '\n' + error.stack)
            })

        const json = await response?.json();

        setTotalExpenses(json.total.toString());
        setReport(json);
    }

    useLayoutEffect(() => {
        fetchData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Header />
                <MonthExpenses total={totalExpenses} />
                {report.total && <CategoriesPieChart report={report} />}
                { //<CategoriesChart /> 
                }
            </ScrollView>

        </SafeAreaView>
    );
}