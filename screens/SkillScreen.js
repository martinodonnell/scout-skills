import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faForward, faBackward, faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { RFPercentage } from "react-native-responsive-fontsize";
import { ListQuestions } from '../component/ListQuestions';
import * as Constants from '../component/Constants'

export const SkillScreen = ({ skill }) => {
  const [questions, setQuestions] = useState([])
  const [currentLevels, setCurrentLevels] = useState([])
  const [level, setLevel] = useState(1)
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const setUp = async () => {
      retrieveCurrentLevel()
      setHeaderTitle(level)
      await retrieveQuestions()

      setAppReady(true)
      console.log("Entering the " + skill + " in level " + level)
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
        setCurrentLevels(JSON.parse(output))
        setLevel(currentLevels[skill])
      } else {
        alert(Constants.CURRENTLEVELS + " data not recieved");
      }
    } catch (e) {
      console.log('Failed to retrieve ' + Constants.CURRENTLEVELS + 'data.' + e)
    }
  }

  const completeLevel = () => {
    var currentLevel = currentLevels[skill]
    if (currentLevel == level) {
      let levelQuestions = questions.questions[level - 1];
      for (i = 0; i < levelQuestions.length; i++) {
        if (levelQuestions[i].checked == false) {
          alert("Not all sections are completed in level " + level);
          return false;
        }
      }

      //check we have not hit last level
      var nextLevel = currentLevel + 1
      if (nextLevel != 10) {
        //update current level value in storage
        updatecurrentLevel()
        refreshScreen(nextLevel)
      } else {
        alert("You have completed every level for " + skill + ", go have a party!!!. ")
      }
      return true;
    } else if (level > currentLevel) {
      alert("The previous levels need to be completed before ticking off level " + level)
    } else {
      alert("You have already completed this level")
    }
    return false
  }

  const updatecurrentLevel = () => {
    currentLevels[skill] = currentLevels[skill] + 1
    setCurrentLevels(currentLevels)
  }

  const refreshScreen = (newLevel) => {
    setLevel(newLevel)
    setHeaderTitle(newLevel)
  }

  const setHeaderTitle = (newLevel) => {
    const title = `${skill} Level ${newLevel}`
    Actions.refresh({ title: title })
  }

  const lowerLevel = () => {
    if (level > 1) {
      refreshScreen(level - 1)
    }
  }

  const higherLevel = () => {
    if (level < 9) {
      refreshScreen(level + 1)
    }
  }

  if (questions.length == 0) {
    return <Text>Loading</Text>
  } else {
    return (
      appReady ? (
        <View style={styles.container}>
          <View style={styles.scroll}>
            <ScrollView style={{ borderRadius: 0 }}>
              <ListQuestions questions={questions} skill={skill} level={1} currentLevel={currentLevels[skill]} />
            </ScrollView>
          </View>

          <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={() => lowerLevel()}>
              <FontAwesomeIcon icon={faBackward} size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => completeLevel()}>
              <FontAwesomeIcon icon={level >= currentLevels[skill] ? farCheckCircle : fasCheckCircle} size={45} mask={'fas'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => higherLevel()}>
              <FontAwesomeIcon icon={faForward} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
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
    flex: 1.5,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});