import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableWithoutFeedback, } from 'react-native';
import { CheckBoxItem } from './CheckBoxItem';

export const ListQuestions = (props) => {
    const [questions, setQuestions] = useState(props.questions)
    const { level, skill, currentLevel } = props

    const handleCheckBox = (id) => {
        const questionTemp = questions
        const index = questions.questions[level - 1].findIndex(x => x.id === id);

        questionTemp.questions[level - 1][index].checked = !questions.questions[level - 1][index].checked;

        setQuestions(questionTemp)
        save(questionTemp);

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
                <CheckBoxItem key={cb.id} onChange={() => handleCheckBox(cb.id)} cb={cb} disabled={false} />
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
    }
})