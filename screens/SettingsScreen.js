import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicatorBase } from 'react-native';
import { retrieveCurrentLevel, saveQuestion, overwriteSpecificJsonFile } from '../services/AsyncService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Constants from '../component/Constants';

const skillColour = [
    { skill: Constants.CAMPING, bgColour: "#009F54" },
    { skill: Constants.BACKWOODS, bgColour: "#559632" },
    { skill: Constants.PIONEERING, bgColour: "#004E50" },
    { skill: Constants.EMERGENCIES, bgColour: "#F57A41" },
    { skill: Constants.HIKING, bgColour: "#F57921" },
    { skill: Constants.AIR, bgColour: "#007CC2" },
    { skill: Constants.PADDLING, bgColour: "#0668B3" },
    { skill: Constants.ROWING, bgColour: "#0668B3" },
    { skill: Constants.SAILING, bgColour: "#0060AA" },
]

const getSkillColour = (skill) => {
    for (var x of skillColour) {
        if (x.skill === skill) {
            return x.bgColour
        }
    }
    return 'blue'
}

export const SettingsScreen = () => {
    const [currentLevels, setCurrentLevels] = useState([]);
    var [update, setUpdate] = useState(false)
    useEffect(() => {
        console.log("Restart")
        const setUp = async () => {
            const tempCurrentLevels = await retrieveCurrentLevel()
            setCurrentLevels(tempCurrentLevels);
        }
        setUp()
    }, [update])

    const resetSkill = async (skill) => {
        const tempCurrentLevels = currentLevels
        tempCurrentLevels[skill] = 0
        await saveQuestion(tempCurrentLevels, Constants.CURRENTLEVELS)
        await overwriteSpecificJsonFile(skill)
        setUpdate(true)
    }

    return (
        <View style={styles.container}>
            {Object.entries(currentLevels).map(([skill, level]) => {
                return (
                    <View key={skill} style={[styles.itemContainer, { backgroundColor: getSkillColour(skill) }]}>
                        <Text style={styles.textStyle}>Level {level + 1} {skill}</Text>
                        <View >
                            <TouchableOpacity onPress={() => resetSkill(skill)} style={styles.buttonStyle}>
                                <Text style={styles.textStyle}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View >
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
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5
    },
    textStyle: {
        color: 'white',
        fontFamily: 'usuzi',
    },
    buttonStyle: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
    }
})