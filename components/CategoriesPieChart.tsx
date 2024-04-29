import { PieChart } from "react-native-gifted-charts";
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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type MonthExpensesProps = {
    report: any;
};

export function CategoriesPieChart(props: MonthExpensesProps): React.JSX.Element {

    // const maxCat = Math.max(...props?.report?.categories?.map(cat => +cat.amount))

    const pallete = [
        '#009FFF',
        '#006DFF', '#93FCF8', '#3BE9DE', '#8F80F3', '#FFA5BA', '#FF7F97',
        '#FC4100', '#FFC55A', '#FF76CE', '#94FFD8', '#00B4FF',
        '#865DFF', '#E384FF', '#4CCD99', '#FF6A00', '#007F73', '#FFC800',
        '#8B322C', '#FF8A00', '#F9F9E0', '#00B4FF', '#FFC800', '#FF7F97',
    ]

    const cats = props.report.categories;
    const pieData = [
        // {
        //     value: 2222,
        //     color: '#009FFF',
        //     gradientCenterColor: '#006DFF',
        //     focused: true,
        // },
        // { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        // { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        // { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ];

    let maxCat = cats[0]
    for (let i = 0; i < cats.length; i++) {
        cats[i].color = getRandomColor();
        if (+cats[i].amount > +maxCat.amount) {
            maxCat = cats[i]
        }
    }

    function getRandomColor(first: boolean = false) {
        const idx = first ? 0 : Math.floor(Math.random() * pallete.length)
        const color = pallete[idx];
        pallete.splice(idx, 1);
        return first ? '#0068a8' : color;
    }

    for (let i = 0; i < cats.length; i++) {
        // if (cats[i].name === maxCat.name) {
        //     continue
        // }

        pieData.push({
            value: +cats[i].amount,
            color: cats[i].color,
            gradientCenterColor: cats[i].color,
            focused: false,

        })
    }

    function LightenDarkenColor(col, amt) {
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
    }

    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                    alignSelf: 'center',
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginBottom: 10,
                        marginTop: 16,
                    }}>
                    {
                        props.report.categories.sort((a, b) => {
                            return +b.amount - +a.amount
                        }).map((cat, i) => {
                            return (
                                <View
                                    key={i}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%',
                                        margin: 10,
                                        justifyContent: 'space-between'
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {renderDot(cat.color)}
                                        <Text style={styles.category}>{cat.name}</Text>
                                    </View>
                                    <Text style={styles.amount}>{
                                        parseFloat(cat.amount).toLocaleString(
                                            'ru-RU',
                                        )} ₽</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </>
        );
    };

    return (
        <View
            style={{
                paddingVertical: 16,
                backgroundColor: '#000',
                flex: 1,
            }}>
            <View
                style={{
                    margin: 20,
                    marginTop: 16,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: '#171717',
                }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Траты
                </Text>
                <View style={{ padding: 0, alignItems: 'center' }}>
                    <PieChart
                        data={pieData}
                        donut
                        sectionAutoFocus
                        radius={120}
                        innerRadius={80}
                        innerCircleColor={'#333'}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: 16, color: 'white', fontWeight: 'bold', fontFamily: 'Onest-SemiBold' }}>{
                                            parseFloat(props.report.categories[0].amount).toLocaleString(
                                                'ru-RU',
                                            )} ₽
                                    </Text>
                                    <Text style={{ fontSize: 12, color: 'white', fontFamily: 'Onest-SemiBold' }}>{props.report.categories[0].name}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                {renderLegendComponent()}
            </View>
        </View>);
}

const styles = StyleSheet.create({

    loading: {
        height: '100%',
    },

    category: {
        fontSize: 14,
        fontFamily: 'Onest-SemiBold',
        color: '#fff',
    },

    amount: {
        fontSize: 14,
        fontFamily: 'Onest-Regular',
        color: '#fff',
        paddingRight: 10,
    },

})