/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import { Home } from './components/pages/Home';
import { Reports } from './components/pages/Reports';
import { ExpensesList } from './components/ExpensesList';
import { MyStack } from './components/pages/CategoryReport';

const Tab = createBottomTabNavigator();


function App(): React.JSX.Element {
  DarkTheme.colors.primary = '#fff'
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
        <Tab.Group>
          <Tab.Screen name="Главная" component={Home} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/home.png')}
                style={{ width: 24, height: 24, }}
              />
            ),
          }} />
          <Tab.Screen name="Отчеты" component={MyStack} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/report.png')}
                style={{ width: 24, height: 24, }}
              />
            ),
          }} />
          <Tab.Screen name="Траты" component={ExpensesList} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/wallet.png')}
                style={{ width: 24, height: 24, }}
              />
            ),
          }} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
