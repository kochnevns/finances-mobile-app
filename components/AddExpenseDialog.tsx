import { Dialog } from 'react-native-simple-dialogs';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

import { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

type AddExpenseDialogProps = {
    visible: boolean,
    setVisible: any,
    navigation: any,
}
export function AddExpenseDialog(props: AddExpenseDialogProps): React.JSX.Element {
    const [categories, setCategories] = useState<string[]>([])
    const [datePickerOpen, setdatePickerOpen] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const [selectedCategory, setSelectedCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function fetchData(): Promise<any> {
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
    }

    async function saveExpense() {
        setIsLoading(true)
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
        setIsLoading(false)
        props.setVisible(false)
        props.navigation.navigate('Траты')
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (

        <Dialog
            visible={props.visible}
            title="Новая трата"
            titleStyle={styles.dialogTitle}
            dialogStyle={styles.dialogStyle}
            onTouchOutside={() => {
                props.setVisible(false)
                props.navigation.navigate('Траты')
            }
            }
        >
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="На что потратили"
                    value={description}
                    onChangeText={(t) => setDescription(t)}
                />

                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="Сколько потратили"
                    value={amount.toString()}
                    onChangeText={(t) => setAmount(t)}
                />

                <View style={styles.whenWrapper}>
                    <Text style={styles.whenLabel}>Когда</Text>
                    <TouchableOpacity onPress={() => setdatePickerOpen(true)} >
                        <Text style={styles.whenDate}>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                </View>

                <DatePicker date={date} onDateChange={setDate} mode='date' modal={true}
                    open={datePickerOpen}
                    onConfirm={(date) => {
                        setdatePickerOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setdatePickerOpen(false)
                    }}
                />
                <View style={styles.catWrapper}>
                    <Text style={styles.catLabel}>Категория</Text>
                    <Picker
                        style={styles.picker}
                        mode='dropdown'
                        selectedValue={selectedCategory}
                        onValueChange={currentCategory => setSelectedCategory(currentCategory)}>
                        {categories.map((item, i) => {
                            return (<Picker.Item label={item} value={item} key={i} />)
                        })
                        }
                    </Picker>
                </View>

                <TouchableOpacity onPress={saveExpense} style={styles.addBtnWrapper} disabled={isLoading}>
                    <Text style={styles.addExpenseBtn}>Добавить</Text>
                </TouchableOpacity>
            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    whenWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },


    catWrapper: {
        flexDirection: 'row',
    },

    picker: {
        margin: -6,
        fontFamily: 'Onest-Regular',
        width: 220
    },

    catLabel: {
        fontFamily: 'Onest-Regular',
        margin: 10,
        marginBottom: 0
    },

    whenDate: {
        color: '#fff',
        fontFamily: 'Onest-SemiBold'
    },
    whenLabel: {
        fontFamily: 'Onest-Regular'
    },

    dialogTitle: {
        fontFamily: 'Onest-SemiBold',
        color: '#fff',
    },
    dialogStyle: {
        backgroundColor: '#111',
        color: '#fff',
        borderRadius: 10
    },
    input: {
        height: 40,
        color: '#fff',
        margin: 10,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 6,
        padding: 10,
        fontFamily: 'Onest-SemiBold',
    },

    addExpenseBtn: {
        fontSize: 14, fontFamily: 'Onest-Regular', color: '#fff',
        margin: 10
    },

    addBtnWrapper: {
        width: 100,
        backgroundColor: '#005dc7',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        alignSelf: 'flex-end',
        borderRadius: 10,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 2,
    },
});