import React, {Component} from 'react';
import { StyleSheet, View,Button,AsyncStorage,Text, TouchableOpacity,ScrollView,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faForward,faBackward,faCheckCircle as fasCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle as farCheckCircle } from '@fortawesome/free-regular-svg-icons'

import ListQuestions from '../component/ListQuestions';
import * as Constants from '../component/Constants'


export default class SkillScreen extends Component { 

  constructor(props){
    super(props);
    this.state = {
      questions:this.props.questions || [],
      skill:this.props.skill,
      level:this.props.level,
      appReady: false,

    }
  }


  componentWillMount(){
    this.retrieveData();
    console.log("Entering the " + this.state.skill + " in level " + this.state.level)
    
  }

  retrieveData = async () => {
    
    const {skill,level,questions} = this.state
    if(Array.isArray(questions) && questions.length==0){
      try {
        const recieveQuestions = await AsyncStorage.getItem('@' + skill);
        if (recieveQuestions !== null) {
          let jsonQuestions = JSON.parse(recieveQuestions);
          this.setState({ questions:jsonQuestions});
          //move to current level in use
          if(jsonQuestions.currentLevel!=1){
            this.setState({level:jsonQuestions.currentLevel})
          }

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
    this.setState({appReady:true})

  }

  completeLevel(){

    const {level,questions,skill} = this.state
    var currentLevel = questions.currentLevel
    if(currentLevel==level){
      let levelQuestions = questions.questions[level-1];
      for(i=0;i<levelQuestions.length;i++){
        if(levelQuestions[i].checked==false){
          alert("Not all sections are completed in level " + level);
          return false;
        }
      }

      //check we have not hit last level
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
        const {level,questions} = this.state 
        var data = questions;
        data.currentLevel = level+1

        this.setState({questions:data});
        this.save(this.state.questions);
    }   

    save = async questions => {
        try {
            await AsyncStorage.setItem('@' + Constants.CAMPING, JSON.stringify(questions))
            console.log('Saved change in state');
        } catch (e) {
            console.log('Failed saving changed state:' + Constants.CAMPING + " " + e);
        }
    }  

  refreshScreen(newLevel){
    const {skill,questions} = this.state;
    //why do I need to set the state before refresh
    this.setState({level:newLevel})
    Actions.refresh({key: 'skillScreen',skill:skill,level:newLevel,questions:questions})
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
    const {questions, level,skill,appReady} = this.state
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
                    <ListQuestions questions={questions} skill={skill} level={level}/> 
                </ScrollView>
            </View>
          
            <View style={styles.nav}>                
                <TouchableOpacity style={styles.button} onPress={()=>this.lowerLevel()}>
                    <FontAwesomeIcon icon={faBackward} size={ 25 }/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.completeLevel()}>
                    <FontAwesomeIcon icon={level>=questions.currentLevel ? farCheckCircle : fasCheckCircle} size={ 45 } mask={'fas'}/>
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
    flex: 4,
  },
  headerText:{
    fontSize:28,
    fontFamily:'usuzi',
  },
  header:{
    backgroundColor:'white',
    alignItems:'center',
  },
  scroll:{
    flex: 15,
    backgroundColor:'white',
  },
  nav:{
    flexDirection: 'row',
    // position: 'absolute', left: 0, right: 0, bottom: 0,
    flex:1,
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
  





