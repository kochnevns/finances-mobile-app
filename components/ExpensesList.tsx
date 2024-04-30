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
    TextInput,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Dialog } from 'react-native-simple-dialogs';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

interface Item {
    title: string;
    icon: any;
    bg: string;
}
interface DataItem {
    title: string;
    data: Item[];
}

export function ExpensesList({ route, navigation }): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark'
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState<DataItem[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [datePickerOpen, setdatePickerOpen] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [selectedCategory, setSelectedCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [iconsMap, _] = useState({
        'Доставки': require('./../assets/dostavka.png'),
        'Готовая еда': require('./../assets/gotovaya_eda.png'),
        'Дуделки': require('./../assets/dudelki.png'),
        'Моти': require('./../assets/pet_supplies.png'),
        'Путешествия': require('./../assets/travel.png'),
        'Рестораны и кафе': require('./../assets/fastfood.png'),
        'Буханка': require('./../assets/buhanka.png'),
        'Здоровье': require('./../assets/health.png'),
        'Ипотека': require('./../assets/mortgage.png'),
        'Коммунальные платежи': require('./../assets/home.png'),
        'Сигареты': require('./../assets/smoking_rooms.png'),
        'Онлайн подписки и лицензии': require('./../assets/online.png'),
        'Продукты': require('./../assets/grocery.png'),
        'Развлечения': require('./../assets/entertaiment.png'),
        'Такси': require('./../assets/taxi.png'),
        'Товары для дома': require('./../assets/add_home.png'), // 'Товары для дома': 'home',
        'Общественный транспорт': require('./../assets/transport.png'),
        'Хуйня всякая': require('./../assets/clown.png'),
        'Гаджеты': require('./../assets/devices_wearables.png'),
        'Одежда': require('./../assets/apparel.png'),
    })

    const [bgMap, __] = useState<any>({
        'Доставки': '#ff4747',
        'Готовая еда': '#268500',
        'Дуделки': '#fa6000',
        'Моти': '#00857a',
        'Путешествия': '#ff1fad',
        'Рестораны и кафе': '#7857ff',
        'Буханка': '#333',
        'Здоровье': '#268500',
        'Ипотека': '#fa6000',
        'Коммунальные платежи': '#00857a',
        'Сигареты': '#ff1fad',
        'Онлайн подписки и лицензии': '#7857ff',
        'Продукты': '#ff4747',
        'Развлечения': '#268500',
        'Такси': '#333',
        'Товары для дома': '#ff1fad',
        'Общественный транспорт': '#333',
        'Хуйня всякая': '#333',
        'Гаджеты': '#ff4747',
        'Одежда': '#7857ff',

    });


    const getExpenses = async () => {
        let methodBody: any = {}

        if (route.params?.category) {
            methodBody = {
                category: route.params.category
            }
        }

        const response = await fetch('http://89.111.174.31:8082/finances.Finances/ExpensesList', {
            method: 'POST',
            body: JSON.stringify(methodBody),
        })
            .catch((error) => {
                Alert.alert('Ошибка', error.message + '\n' + error.stack)
            })

        const json = await response?.json();

        const datesMap: any = {}
        const sumsMap: any = {}
        const validDatesMap: any = {}

        for (let i = 0; i < json.expenses.length; i++) {
            const item = json.expenses[i];
            const d = new Date(item.date).toLocaleDateString()
            if (d === 'Invalid Date') {
                continue
            }
            if (!datesMap[d]) {
                datesMap[d] = [];
                validDatesMap[d] = new Date(item.date)
                sumsMap[d] = 0
            }

            datesMap[d].push(item.description.trim() + ';' + item.amount + ';' + item.category);

            sumsMap[d] += parseInt(item.amount)
        }

        const newData: any[] = []

        Object.keys(datesMap).forEach(key => {
            newData.push({ title: key, data: datesMap[key] })
        })


        setData(newData.sort((a, b) => {
            return new Date(validDatesMap[b.title]).getTime() - new Date(validDatesMap[a.title]).getTime()
        }));


        const response2 = await fetch('http://89.111.174.31:8082/finances.Finances/CategoriesList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const json2 = await response2.json();
        const cats = []

        for (let i = 0; i < json2.categories.length; i++) {
            const item = json2.categories[i];
            cats.push(item.name)
        }

        setCategories(cats);
        setSelectedCategory(cats[0])

        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("FOCUS EXPENSES")
            getExpenses()
        })
        return unsubscribe
    }, [navigation]);

    async function saveExpense() {
        setLoading(true)
        await fetch('http://89.111.174.31:8082/finances.Finances/Expense', {
            method: 'POST',
            body: JSON.stringify({
                amount: amount,
                category: selectedCategory,
                date: date.toISOString(),
                description: description,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        setAmount('')
        setDescription('')
        setDate(new Date())
        await getExpenses()
        setLoading(false)
        setDialogVisible(false)
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            {isLoading ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : (
                <View>
                    <SectionList
                        sections={data}
                        keyExtractor={(item, index) => item.title + index.toString()}
                        renderItem={({ item }: any) => (
                            <View style={styles.item}>
                                <View style={[styles.iconWrapper, { backgroundColor: bgMap[item.split(';')[2]] }]}>
                                    <Image style={[styles.category, item.split(';')[2].includes('Буханка') && styles.iconFullsize]} source={iconsMap[item.split(';')[2]]} />
                                </View>
                                <View style={styles.itemTitle}>
                                    <Text style={styles.title}>{item.split(';')[0]}</Text>
                                    <Text style={styles.subtitle}>{item.split(';')[2]}</Text>
                                </View>

                                <Text style={styles.amount}>{
                                    parseFloat(item.split(';')[1]).toLocaleString(
                                        'ru-RU',
                                    )
                                    + ' ₽'}</Text>
                            </View>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.header}>{title}</Text>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    loading: {
        height: '100%',
    },
    item: {
        backgroundColor: "#111",
        padding: 10,
        paddingBottom: 16,
        paddingTop: 16,
        fontFamily: 'Onest-Regular',
        fontSize: 12,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    header: {
        padding: 16,
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        shadowColor: '#111',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        backgroundColor: '#111',
    },
    title: {
        fontSize: 16,
        color: '#fff',
        paddingBottom: 16,
        paddingTop: 6,
        // alignSelf: 'center',
        textAlign: 'left',
        fontFamily: 'Onest-SemiBold',
    },

    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ff8614',
        marginRight: 10,
        marginTop: -2,
        display: 'flex',
        shadowColor: '#223',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
    category: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginTop: 10,
    },

    iconFullsize: {
        width: 40,
        height: 40,
        marginTop: 2
    },

    subtitle: {
        marginTop: -14,
        fontSize: 12,
        color: "#aaa",
        fontFamily: 'Onest-Light',
    },
    amount: {
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        textAlign: 'right',
        alignItems: 'flex-start',
        fontSize: 16,
        color: "#fff",
        flex: 1,
        verticalAlign: 'middle',
        textAlignVertical: 'center',
        paddingTop: 4,
        fontFamily: 'Onest-Regular',
    },
    itemTitle: {
        flexDirection: 'column',
        marginTop: -7,
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