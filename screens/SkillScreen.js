import React, {Component} from 'react';
import { StyleSheet, View,Button,AsyncStorage,Text, TouchableOpacity,ScrollView,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faForward,faBackward,faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { RFPercentage } from "react-native-responsive-fontsize";

import ListQuestions from '../component/ListQuestions';
import * as Constants from '../component/Constants'
import {db,auth} from '../constants/FireBaseConfig'

export default class SkillScreen extends Component { 

  constructor(props){
    super(props);
    this.state = {
      questions:this.props.questions || [],
      skill:this.props.skill,
      currentLevels:this.props.questions || [],
      level:this.props.level,
      appReady: false,
    }
  }


  async componentWillMount(){
    //do this better some time
    await this.retrieveQuestions();
    await this.retrieveAnswers();
    await this.retrieveCurrentLevel().then(()=>console.log("Got CUrrent Levels"))

    this.setState({appReady:true})
    console.log("Entering the " + this.state.skill + " in level " + this.state.level)   

  }

  async retrieveQuestions(){    
    const {skill,questions} = this.state
    if(Array.isArray(questions) && questions.length==0){
      try {
        const result = await AsyncStorage.getItem('@' + skill);
        if (result !== null) {
          let jsonQuestions = JSON.parse(result);
          this.setState({ questions:jsonQuestions});
          console.log(skill + " data saved to state")
        }else{
          alert(skill + " data not recieved");
        }
      } catch (e) {
        alert('Failed to retrieve '+skill+'data.' + e)
      }
    }else{
      console.log(skill + " question already populated")
    }
  }

  async retrieveCurrentLevel(){    
      const {skill} = this.state
      userId = auth.currentUser.uid
      return db.ref('/users/' + userId + "/currentLevels").on('value', (snapshot) => {
          let currentLevels = snapshot.val();
          this.setState({ currentLevels,level:currentLevels[skill]});    
          console.log("got current levels: ")
      })
      
  }

  async retrieveAnswers(){
    const {skill,questions} = this.state
      try {
        const output = await AsyncStorage.getItem('@' + skill + "A");
        if (output !== null) {
          let currentAnswers = JSON.parse(output).answers;
          for(x in currentAnswers){
            for(y in currentAnswers[x]){
              if(currentAnswers[x][y].checked){
                bagdeID = Math.floor(currentAnswers[x][y].id/100)-1
                questionID = currentAnswers[x][y].id%100
                questions.questions[bagdeID][questionID].checked = true
              }
            }
          }
        }else{
          alert(Constants.skill + " answers not recieved");
        }
      } catch (e) {
        alert('Failed to retrieve '+Constants.skill+'data.' + e)
      }
  }
  

  completeLevel(){

    const {level,questions,skill,currentLevels} = this.state
    var currentLevel = currentLevels[skill]
    if(currentLevel==level){
      let levelQuestions = questions.questions[level-1];
      for(i=0;i<levelQuestions.length;i++){
        if(levelQuestions[i].checked==false){
          alert("Not all sections are completed in level " + level);
          return false;
        }
      }

      // //check we have not hit last level
      var nextLevel = currentLevel+1
      if(nextLevel!=10){
      //update current level value in storage
        this.updatecurrentLevel()      
        this.refreshScreen(nextLevel)
      }else{
        alert("You have completed every level for " + skill + ", go have a party!!!. ")
      }
      return true;
    }else if(level>currentLevel){
      alert("The previous levels need to be completed before ticking off level " + level)
    }else{
      alert("You have already completed this level")
    }
    return false    
  }

  updatecurrentLevel(){
      const {currentLevels,skill} = this.state 
      currentLevels[skill] = currentLevels[skill]+1
      this.save(currentLevels,Constants.CURRENTLEVELS);
      this.setState({currentLevels:currentLevels});        
  }

  refreshScreen(newLevel){
    this.setState({level:newLevel})
  }   

  async save(data,key){
      try {
          await AsyncStorage.setItem('@' + key, JSON.stringify(data))
          console.log('Saved change in state');
      } catch (e) {
          console.log('Failed saving changed state:' + key + " " + e);
      }
  }   

  lowerLevel(){
    const {skill, level,questions} = this.state;
    if(level>1){
      this.refreshScreen(level - 1)
    }
  }

   higherLevel(){
    const {skill, level,questions} = this.state;
    if(level<9){
      this.refreshScreen(level +1)
    }
  }

  render(){
    const {questions, level,skill,appReady,currentLevels} = this.state
    const {textColor} = this.props

    
    if(questions.length==0){
        return <Text>Loading</Text>
    }else{
      return (  
         appReady ? (
          <View style={styles.container}>  
            <View style={styles.header}>
              <Text style={[styles.headerText,{color:textColor}]}>{this.state.skill} Level {level}</Text>      
            </View>

            <View style={styles.scroll}>
                <ScrollView style={{borderRadius:0}}>  
                    <ListQuestions questions={questions} skill={skill} level={level} currentLevel={currentLevels[skill]}/> 
                </ScrollView>
            </View>
          
            <View style={styles.nav}>                
                <TouchableOpacity style={styles.button} onPress={()=>this.lowerLevel()}>
                    <FontAwesomeIcon icon={faBackward} size={ 25 }/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.completeLevel()}>
                    <FontAwesomeIcon icon={level>=currentLevels[skill] ? farCheckCircle : fasCheckCircle} size={ 45 } mask={'fas'}/>
                </TouchableOpacity>    
                <TouchableOpacity style={styles.button} onPress={()=>this.higherLevel()}>                    
                    <FontAwesomeIcon icon={faForward} size={ 25 } />
                </TouchableOpacity>  
            </View>            
          </View>
         ) : null
        
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
  },
  headerText:{
    fontSize:RFPercentage(3.5),
    fontFamily:'usuzi',
    
  },
  header:{
    backgroundColor:'white',
    alignItems:'center',
    flex:0.5
  },
  scroll:{
    flex: 15,
    backgroundColor:'white',
  },
  nav:{
    flexDirection: 'row',
    flex:1.5,
    justifyContent:'flex-end',
    backgroundColor:'white',
  },
  button:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center'    
  },
});
  





