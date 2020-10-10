import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, } from 'react-native';
import CheckBox from 'react-native-check-box'

export const CheckBoxItem = ({ cb, onChange, disabled }) => {
    const [isChecked, setIsChecked] = useState(cb.checked)

    const onClick = () => {
        if (!disabled) {
            setIsChecked(!isChecked)
            onChange()
        }
    }

    return (
        <TouchableWithoutFeedback key={cb.id} onPress={() => onClick()}>
            <View style={styles.container}>
                <CheckBox style={styles.checkBox} isChecked={isChecked} size={1} onClick={() => onClick} />
                <Text style={styles.text}>{cb.question}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 3,
    },

    checkBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        flex: 4,
        fontSize: 15
    },

})
