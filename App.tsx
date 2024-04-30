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

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import { Home } from './components/pages/Home';
// import { Reports } from './components/pages/Reports';
import { ExpensesList } from './components/ExpensesList';

import { AddExpenseButton } from './components/AddExpenseButton';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      <AddExpenseButton navigation={navigation} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const Icon = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabBarButton}
          >
            <View>
              <Icon />
            </View>
            <Text style={{ color: isFocused ? '#fff' : '#999', fontFamily: 'Onest-SemiBold', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function App(): React.JSX.Element {
  DarkTheme.colors.primary = '#fff'
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: 'Onest-SemiBold' },
          headerShown: false,
        }}
      >
        <Tab.Group>
          <Tab.Screen name="Главная" component={Home} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/home.png')}
                style={{ width: 30, height: 30, }}
              />
            ),
          }} />
          {/* <Tab.Screen name="Отчеты" component={MyStack} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/report.png')}
                style={{ width: 24, height: 24, }}
              />
            ),
          }} /> */}
          <Tab.Screen name="Траты" component={ExpensesList} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/wallet.png')}
                style={{ width: 30, height: 30, }}
              />
            ),
          }} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#222',
    paddingTop: 4,
    zIndex: 100
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});

export default App;
