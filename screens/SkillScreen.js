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
  const [currentStages, setCurrentStages] = useState([])
  const [stage, setStage] = useState(0)
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const setUp = async () => {
      setAppReady(false)     
      await retrieveCurrentStage()
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

  const retrieveCurrentStage = async () => {
    try {
      const output = await AsyncStorage.getItem('@' + Constants.CURRENTSTAGES);
      if (output !== null) {
        const jsonOutput = JSON.parse(output)
        await setCurrentStages(jsonOutput)
        await setStage(parseInt(jsonOutput[skill]))
        setHeaderTitle(jsonOutput[skill])

      } else {
        alert(Constants.CURRENTSTAGES + " data not recieved");
      }
    } catch (e) {
      console.log('Failed to retrieve ' + Constants.CURRENTSTAGES + 'data.' + e)
    }
  }

  const completeStage = () => {
    const currentStage = currentStages[skill]
    const displayStage = stage + 1
    if (currentStage == stage) {
      let stageQuestions = questions.questions[stage];
      for (var i = 0; i < stageQuestions.length; i++) {
        if (stageQuestions[i].checked == false) {
          alert("Not all sections are completed in stage " + displayStage);
          return false;
        }
      }

      //check we have not hit last stage
      var nextStage = currentStage + 1
      if (nextStage != 10) {
        //update current stage value in storage
        updateCurrentStage()
        refreshScreen(nextStage)
      } else {
        alert("You have completed every stage for " + skill + ", go have a party!!!. ")
      }
      return true;
    } else if (stage > currentStage) {
      alert("The previous stages need to be completed before ticking off stage " + displayStage)
    } else {
      alert("You have already completed this stage")
    }
    return false
  }

  const updateCurrentStage = () => {
    currentStages[skill] += 1
    setCurrentStages(currentStages)
    saveQuestion(currentStages, Constants.CURRENTSTAGES)
  }

  const setHeaderTitle = (newStage) => {
    const title = `${skill} stage ${newStage + 1}`
    Actions.refresh({ title: title })
  }

  const lowerStage = () => {
    if (stage > 0) {
      refreshScreen(stage - 1)
    }
  }

  const higherStage = () => {
    if (stage < 8) {
      refreshScreen(stage + 1)
    }
  }

  const refreshScreen = (newStage) => {
    setStage(newStage)
    setHeaderTitle(newStage)
  }

  if (questions.length == 0) {
    return null
  } else {
    return (
      appReady ? (
        <View style={styles.container}>
          <View style={styles.scroll}>
            <ScrollView style={{ borderRadius: 0 }}>
              <ListQuestions questions={questions} skill={skill} stage={stage} currentStage={currentStages[skill]} />
            </ScrollView>
          </View>

          <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={() => lowerStage()}>
              <FontAwesomeIcon
                icon={faBackward}
                size={25}
                color='white'
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => completeStage()}>
              <FontAwesomeIcon
                icon={stage >= currentStages[skill] ? farCheckCircle : fasCheckCircle}
                size={45}
                mask={'fas'}
                color='white'
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => higherStage()}>
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
    flex: 1.2,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: Constants.SECOND_COLOUR,
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