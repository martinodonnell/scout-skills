import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faForward, faBackward, faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { RFPercentage } from "react-native-responsive-fontsize";
import { ListQuestions } from '../component/ListQuestions';
import * as Constants from '../component/Constants'
import { saveQuestion } from '../services/AsyncService';

export const SkillScreen = ({ skill }) => {
  const [questions, setQuestions] = useState([])
  const [currentLevels, setCurrentLevels] = useState([])
  const [level, setLevel] = useState(0)
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const setUp = async () => {
      setAppReady(false)     
      await retrieveCurrentLevel()
      await retrieveQuestions()
      setAppReady(true)
    }
    setUp()
  }, [skill])


  const retrieveQuestions = async () => {
    try {
      const result = await AsyncStorage.getItem('@' + skill);
      if (result !== null) {
        await setQuestions(JSON.parse(result));
      }
    } catch (e) {
      console.log('Failed to retrieve ' + skill + 'data.' + e)
    }
  }

  const retrieveCurrentLevel = async () => {
    try {
      const output = await AsyncStorage.getItem('@' + Constants.CURRENTLEVELS);
      if (output !== null) {
        const jsonOutput = JSON.parse(output)
        await setCurrentLevels(jsonOutput)
        await setLevel(parseInt(jsonOutput[skill]))
        setHeaderTitle(jsonOutput[skill])

      } else {
        alert(Constants.CURRENTLEVELS + " data not recieved");
      }
    } catch (e) {
      console.log('Failed to retrieve ' + Constants.CURRENTLEVELS + 'data.' + e)
    }
  }

  const completeLevel = () => {
    const currentLevel = currentLevels[skill]
    const displayLevel = level + 1
    if (currentLevel == level) {
      let levelQuestions = questions.questions[level];
      for (var i = 0; i < levelQuestions.length; i++) {
        if (levelQuestions[i].checked == false) {
          alert("Not all sections are completed in level " + displayLevel);
          return false;
        }
      }

      //check we have not hit last level
      var nextLevel = currentLevel + 1
      if (nextLevel != 10) {
        //update current level value in storage
        updateCurrentLevel()
        refreshScreen(nextLevel)
      } else {
        alert("You have completed every level for " + skill + ", go have a party!!!. ")
      }
      return true;
    } else if (level > currentLevel) {
      alert("The previous levels need to be completed before ticking off level " + displayLevel)
    } else {
      alert("You have already completed this level")
    }
    return false
  }

  const updateCurrentLevel = () => {
    currentLevels[skill] += 1
    setCurrentLevels(currentLevels)
    saveQuestion(currentLevels, Constants.CURRENTLEVELS)
  }

  const setHeaderTitle = (newLevel) => {
    const title = `${skill} Level ${newLevel + 1}`
    Actions.refresh({ title: title })
  }

  const lowerLevel = () => {
    if (level > 0) {
      refreshScreen(level - 1)
    }
  }

  const higherLevel = () => {
    if (level < 8) {
      refreshScreen(level + 1)
    }
  }

  const refreshScreen = (newLevel) => {
    setLevel(newLevel)
    setHeaderTitle(newLevel)
  }

  if (questions.length == 0) {
    return null
  } else {
    return (
      appReady ? (
        <View style={styles.container}>
          <View style={styles.scroll}>
            <ScrollView style={{ borderRadius: 0 }}>
              <ListQuestions questions={questions} skill={skill} level={level} currentLevel={currentLevels[skill]} />
            </ScrollView>
          </View>

          <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={() => lowerLevel()}>
              <FontAwesomeIcon
                icon={faBackward}
                size={25}
                color='white'
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => completeLevel()}>
              <FontAwesomeIcon
                icon={level >= currentLevels[skill] ? farCheckCircle : fasCheckCircle}
                size={45}
                mask={'fas'}
                color='white'
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => higherLevel()}>
              <FontAwesomeIcon
                icon={faForward}
                size={25}
                color='white'
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : null

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 25,
    flex: 1,
  },
  headerText: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'usuzi',
  },
  scroll: {
    flex: 15,
    backgroundColor: 'white',
  },
  nav: {
    flexDirection: 'row',
    flex: 1.3,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FF8846',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});