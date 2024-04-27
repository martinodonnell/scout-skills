import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { retrieveCurrentStage, saveQuestion, overwriteSpecificJsonFile } from '../services/AsyncService';
import * as Constants from '../component/Constants';
import { RFPercentage } from 'react-native-responsive-fontsize';

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

export default function Settings() {
    const [currentStages, setCurrentStages] = useState([]);
    var [update, setUpdate] = useState(false)
    useEffect(() => {
        const setUp = async () => {
            const tempCurrentStages = await retrieveCurrentStage()
            console.log("tempCurrentStages", tempCurrentStages)
            setCurrentStages(tempCurrentStages);
        }
        setUp()
    }, [update])

    const createThreeButtonAlert = (skill, stage) => (
        Alert.alert(
        `Resetting ${skill} back to 1`,
        `Are you sure you want reset stage ${stage+1} of ${skill} back to 1?`,
        [
            { text: "No" },
            { text: "OK", onPress: () => resetSkill(skill) }
        ],
        { cancelable: true }
        )
    )

    const resetSkill = async (skill) => {
        const tempCurrentStages = currentStages
        tempCurrentStages[skill] = 0
        await saveQuestion(tempCurrentStages, Constants.CURRENTSTAGES)
        await overwriteSpecificJsonFile(skill)
        setUpdate(true)
    }

    const navigateAboutApp = () => {
        Actions.aboutApp()
    }

    if(currentStages.length===0){
        return null
    }
    return (
        <View style={styles.container}>
            {Object.entries(currentStages).map(([skill, stage]) => {
                return (
                    <View key={skill} style={[styles.itemContainer,styles.borderStyle, { backgroundColor: getSkillColour(skill) }]}>
                        <Text style={styles.textStyle}> {stage + 1} {skill}</Text>
                        <TouchableOpacity onPress={() => createThreeButtonAlert(skill, stage)} style={styles.buttonStyle} disabled={stage==0}>
                            <Text style={[styles.textStyle, stage==0 && {opacity:0.5}]}>Reset</Text>
                        </TouchableOpacity>
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
        fontFamily: 'usuzi',
        fontSize:RFPercentage(2),
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: "red",
        padding: 1,
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
