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

const Tab = createBottomTabNavigator();


function App(): React.JSX.Element {
  DarkTheme.colors.primary = '#00b3a1'
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
          <Tab.Screen name="Отчеты" component={Reports} options={{
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

interface DataItem {
  title: string;
  data: string[];
}

function ExpensesList(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>([]);


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
                  <View style={styles.iconWrapper}>
                    <Image style={styles.category} source={require('./assets/fastfood.png')} />
                  </View>
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

      <TouchableOpacity onPress={() => Alert.alert('Button with adjusted color pressed')} style={styles.appButtonContainer}>
        <Image style={styles.add} source={require('./assets/add.png')} />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  appButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 8,
    backgroundColor: "#00b3a1",
    paddingVertical: 10,
    paddingHorizontal: 12,
    zIndex: 200,
    width: 64,
    height: 64,
    borderRadius: 32,
    transform: [{ scale: 0.76 }],
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  add: {
    width: 40,
    height: 40,
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
    color: "#fff"
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#111",
    padding: 10,
    marginVertical: 0,
    //fontFamily: 'PSL Ornanong Pro',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  header: {
    padding: 16,
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    shadowColor: '#111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 14,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 16,
    paddingTop: 6,
    alignSelf: 'center'
  },

  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff8614',
    marginRight: 10,
    display: 'flex',
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  category: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    marginTop: 6,
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
