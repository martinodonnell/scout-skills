import { AsyncStorage } from 'react-native';
import * as Constants from '../component/Constants';

const saveQuestionIfNotThere = async (questions, skill) => {
    try {
        var isDataSaved = await AsyncStorage.getItem('@' + skill)
        if (!isDataSaved) {
            await AsyncStorage.setItem('@' + skill, JSON.stringify(questions))
        } else {
            // console.log(skill + ' is already saved')
        }
    } catch (e) {
        console.log('Failed to save.' + skill + ':' + e)
    }
}

const saveQuestion = async (questions, skill) => {
    try {
        await AsyncStorage.setItem('@' + skill, JSON.stringify(questions))
        console.log('Saved ' + skill + ' changes');
    } catch (e) {
        console.log('Failed saving changed state for ' + skill + ":" + e);
    }
}

const setUpInitalFiles = () => {
    const skillJsonFiles = [
        { path: './assets/json/1_camping.json', skill: Constants.CAMPING },
        { path: './assets/json/2_backwoods.json', skill: Constants.BACKWOODS },
        { path: './assets/json/3_pioneering.json', skill: Constants.PIONEERING },
        { path: './assets/json/4_emergencies.json', skill: Constants.EMERGENCIES },
        { path: './assets/json/5_hillwalking.json', skill: Constants.HIKING },
        { path: './assets/json/6_air.json', skill: Constants.AIR },
        { path: './assets/json/7_paddling.json', skill: Constants.PADDLING },
        { path: './assets/json/8_rowing.json', skill: Constants.ROWING },
        { path: './assets/json/9_sailing.json', skill: Constants.SAILING },
        { path: './assets/json/10_currentLevels.json', skill: Constants.CURRENTLEVELS }
    ]
    const promises = []
    for (var file of skillJsonFiles) {
        promises.push(saveQuestionIfNotThere(file.path, file.skill))
    }

    return Promise.all(promises)
}

const retrieveQuestions = async () => {
    try {
        const result = await AsyncStorage.getItem('@' + skill);
        return JSON.parse(result)
    } catch (e) {
        console.log('Failed to retrieve ' + skill + 'data.' + e)
    }
    return []
}

const retrieveCurrentLevel = async () => {
    try {
        const output = await AsyncStorage.getItem('@' + Constants.CURRENTLEVELS);
        return JSON.parse(output)
    } catch (e) {
        console.log('Failed to retrieve ' + Constants.CURRENTLEVELS + 'data.' + e)
    }
    return []
}

export { setUpInitalFiles, retrieveQuestions, retrieveCurrentLevel, saveQuestion }