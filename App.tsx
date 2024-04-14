/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Tab = createBottomTabNavigator();


function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Траты" component={ExpensesList} />
        <Tab.Screen name="Отчеты" component={View} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function ExpensesList(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const DATA = [
    {
      title: '21.02.2022',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: '22.02.2022',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps', 'French Fries', 'Onion Rings', 'Fried Shrimps', 'French Fries', 'Onion Rings', 'Fried Shrimps', 'French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: '23.02.2022',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: '25.02.2022',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.category} source={require('./assets/logo.png')} />
              <View style={styles.itemTitle}>
                <Text style={styles.title}>{item}</Text>
                {/* <Text style={styles.subtitle}>21.04.2024</Text> */}
              </View>

              <Text style={styles.amount}>1098.00 $</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />

      </ScrollView>

      <View style={styles.button}>
        <Button
          title="Добавить"
          color="#ccc"
          onPress={() => Alert.alert('Button with adjusted color pressed')}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#434343',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  section: {
    backgroundColor: '#434343',
    color: "#fff"
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#111111',
    padding: 10,
    marginVertical: 0,
    fontFamily: 'Helvetica',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  header: {
    padding: 8,
    fontSize: 14,
    backgroundColor: '#222222',
    color: '#fff',
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 4
  },
  category: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 8,
    color: "#aaa"
  },
  amount: {
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'right',
    alignItems: 'flex-start',
    fontSize: 12,
    color: "#ddd",
    flex: 1,
    verticalAlign: 'middle',
    textAlignVertical: 'center',
    paddingTop: 4
  },
  itemTitle: {
    flexDirection: 'column',
  },

  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#444444',
    fontSize: 2,
    shadowColor: '#333',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
  }
});

export default App;
