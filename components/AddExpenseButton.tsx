import React, { useEffect, useState } from 'react';
// import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View
} from 'react-native';

import { AddExpenseDialog } from './AddExpenseDialog';

export function AddExpenseButton({ navigation }): React.JSX.Element {
    const [dialogVisible, setDialogVisible] = useState(false)

    return (
        <View style={styles.appButtonWrapper}>
            <TouchableOpacity onPress={() => setDialogVisible(true)} style={styles.appButtonContainer}>
                <Image style={styles.add} source={require('./../assets/add.png')} />
            </TouchableOpacity>
            <AddExpenseDialog visible={dialogVisible} setVisible={setDialogVisible} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    appButtonWrapper: {
        flex: 0,
        position: 'absolute',
        left: '50%',
        marginLeft: -32,
        marginTop: -20,
    },
    appButtonContainer: {
        flex: 0,
        backgroundColor: "#454545",
        paddingVertical: 10,
        paddingHorizontal: 12,
        zIndex: 200,
        width: 64,
        height: 64,
        borderRadius: 32,
        transform: [{ scale: 0.96 }],
        shadowColor: '#fff',
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 0.8,
        borderWidth: 4,
        borderColor: "#222",
    },
    add: {
        width: 30,
        height: 30,
        marginTop: 2,
        marginLeft: 1,
    },
});