/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import { Home } from './components/pages/Home';
import { Reports } from './components/pages/Reports';

const Tab = createBottomTabNavigator();


function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator>
        <Tab.Group>
          <Tab.Screen name="Главная" component={Home} options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/avatar.png')}
                style={{ width: 24, height: 24, }}
              />
            ),
            tabBarIconStyle: {
              //color: '#fff',
            }
          }} />
          <Tab.Screen name="Отчеты" component={Reports} />
          <Tab.Screen name="Траты" component={ExpensesList} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

interface DataItem {
  title: string;
  data: string[];
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

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>(DATA);


  const getMovies = async () => {
    const response = await fetch('http://localhost:8082/finances.Finances/ExpensesList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    const datesMap = {}

    for (let i = 0; i < json.expenses.length; i++) {
      const item = json.expenses[i];
      if (!datesMap[item.date]) {
        datesMap[item.date] = [];
      }
      datesMap[item.date].push(item.who + ';' + item.amount)
      datesMap[item.date].push(item.who + ';' + item.amount)
      datesMap[item.date].push(item.who + ';' + item.amount)
      datesMap[item.date].push(item.who + ';' + item.amount)
      datesMap[item.date].push(item.who + ';' + item.amount)
    }

    const newData = []

    Object.keys(datesMap).forEach(key => {
      newData.push({ title: key, data: datesMap[key] })
    })
    setData(newData);

    setLoading(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <SectionList
              sections={data}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image style={styles.category} source={require('./assets/logo.png')} />
                  <View style={styles.itemTitle}>
                    <Text style={styles.title}>{item.split(';')[0]}</Text>
                    {/* <Text style={styles.subtitle}>21.04.2024</Text> */}
                  </View>

                  <Text style={styles.amount}>{item.split(';')[1] + ' ₽'}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
        </View>
      )}

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
    backgroundColor: '#212121',
    padding: 10,
    marginVertical: 0,
    //fontFamily: 'PSL Ornanong Pro',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  header: {
    padding: 10,
    fontSize: 14,
    fontFamily: 'Rockwell',
    backgroundColor: '#323232',
    color: '#fff',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Tahoma',
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
    bottom: 8,
    right: 16,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#444444',
    fontSize: 2,
    shadowColor: '#111',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
  }
});

export default App;
