import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicatorBase } from 'react-native';
import { retrieveCurrentLevel, saveQuestion, overwriteSpecificJsonFile } from '../services/AsyncService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Constants from '../component/Constants';
import { Actions } from 'react-native-router-flux';

export const SettingsScreen = () => {
    const [currentLevels, setCurrentLevels] = useState([]);

    useEffect(() => {
        console.log("Restart")
        const setUp = async () => {
            const tempCurrentLevels = await retrieveCurrentLevel()
            setCurrentLevels(tempCurrentLevels);
        }
        setUp()
    }, [])

    const resetSkill = async (skill) => {
        console.log("Reset skill", skill)
        const tempCurrentLevels = currentLevels
        tempCurrentLevels[skill] = 0
        await saveQuestion(tempCurrentLevels, Constants.CURRENTLEVELS)
        await overwriteSpecificJsonFile(skill)
        Actions.settings()
    }

    return (
        <View style={styles.container}>
            {Object.entries(currentLevels).map(([skill, level]) => {
                return (
                    <View key={skill} style={styles.itemContainer}>
                        <Text>Level {level + 1} {skill}</Text>
                        <TouchableOpacity onPress={() => resetSkill(skill)} style={styles.buttonStyle}>
                            <Text>Reset</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        margin: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black'
    }
})