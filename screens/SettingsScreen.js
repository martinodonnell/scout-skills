import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicatorBase } from 'react-native';
import { retrieveCurrentLevel, saveQuestion, overwriteSpecificJsonFile } from '../services/AsyncService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Constants from '../component/Constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Actions } from 'react-native-router-flux';

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

    const navigateAboutApp = () => {
        Actions.aboutApp()
    }

    return (
        <View style={styles.container}>
            {Object.entries(currentLevels).map(([skill, level]) => {
                return (
                    <View key={skill} style={[styles.itemContainer,styles.borderStyle, { backgroundColor: getSkillColour(skill) }]}>
                        <Text style={styles.textStyle}>Level {level + 1} {skill}</Text>
                        <View >
                            <TouchableOpacity onPress={() => resetSkill(skill)} style={styles.buttonStyle}>
                                <Text style={styles.textStyle}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
             <TouchableOpacity style={[styles.borderStyle, styles.aboutUsButton]} onPress={() => navigateAboutApp()}>
                <Text style={styles.aboutUsText}>About Us</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borderStyle: {
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5
    },
    textStyle: {
        color: 'white',
        fontFamily: 'usuzi',
        fontSize:RFPercentage(2)
    },
    buttonStyle: {
        backgroundColor: "red",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    aboutUsButton: {
        alignItems:'center',
        justifyContent:'center'
    },
    aboutUsText:{
        color:'black',
        fontFamily: 'usuzi',
        fontSize:RFPercentage(2)
    }
})