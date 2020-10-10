import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableWithoutFeedback } from 'react-native';
import CheckBox from 'react-native-check-box'

export const ListQuestions = (props) => {
    const [questions, setQuestions] = useState(props.questions)
    const { level, skill, currentLevel } = props

    useEffect(() => {
        console.log("Hello")
    }, [questions])

    const handleCheckBox = (id) => {
        console.log(id)
        if (level >= currentLevel) {
            const questionTemp = questions
            const index = questions.questions[level - 1].findIndex(x => x.id === id);

            questionTemp.questions[level - 1][index].checked = !questions.questions[level - 1][index].checked;

            setQuestions(questionTemp)
            save(questionTemp);
        } else {
            console.log("This level is locked because it has been completed")
        }
    }

    const save = async (questions) => {
        try {
            await AsyncStorage.setItem('@' + skill, JSON.stringify(questions))
            console.log('Saved ' + skill + ' changes');
        } catch (e) {
            console.log('Failed saving changed state for ' + skill + ":" + e);
        }
    }

    return (
        questions && questions.questions[level - 1].map((cb) => {
            return (
                <TouchableWithoutFeedback key={cb.id} onPress={() => handleCheckBox(cb.id)}>
                    <View style={styles.container}>
                        <CheckBox style={styles.checkBox} isChecked={cb.checked} size={1} onClick={() => handleCheckBox(cb.id)} />
                        <Text style={styles.text}>{cb.question}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
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










