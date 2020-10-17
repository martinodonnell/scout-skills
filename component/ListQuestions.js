import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CheckBoxItem } from './CheckBoxItem';
import { saveQuestion } from '../services/AsyncService'
export const ListQuestions = (props) => {
    const [questions, setQuestions] = useState(props.questions)
    const { stage, skill } = props

    const handleCheckBox = (id) => {
        const questionTemp = questions
        const index = questions.questions[stage].findIndex(x => x.id === id);
        questionTemp.questions[stage][index].checked = !questions.questions[stage][index].checked;

        setQuestions(questionTemp)
        saveQuestion(questionTemp, skill);
    }

    return (
        questions && questions.questions[stage].map((cb) => {
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