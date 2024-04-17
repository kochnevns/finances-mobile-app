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
    Dimensions
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import {
    BarChart,
} from "react-native-chart-kit";

import { PieChart } from "react-native-gifted-charts";

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer, DarkTheme } from '@react-navigation/native';

export function CategoriesChart(): React.JSX.Element {

    const chartConfig = {
        backgroundGradientFrom: "#06fee9",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    }

    const ddata = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]


    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    }

    const screenWidth = Dimensions.get("window").width;

    return (
        <SafeAreaView style={styles.chart}>
            <BarChart
                data={data}
                width={screenWidth}
                height={320}
                yAxisLabel=""
                yAxisSuffix=" ₽"
                chartConfig={chartConfig}
                verticalLabelRotation={0}
            />
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