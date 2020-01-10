import React, {Component} from 'react';
import { StyleSheet, View,Button,AsyncStorage,Text, TouchableOpacity,ScrollView,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon,forward } from '@fortawesome/react-native-fontawesome'
import { faHome,faForward,faBackward } from '@fortawesome/free-solid-svg-icons'

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

  retrieveData = async () => {
    
    const {skill,level,questions} = this.state
    if(Array.isArray(questions) && questions.length==0){
      try {
        const recieveQuestions = await AsyncStorage.getItem('@' + skill);
        if (recieveQuestions !== null) {
          let jsonQuestions = JSON.parse(recieveQuestions);
          this.setState({ questions:jsonQuestions});

          // //move to current stage in use
          if(jsonQuestions.currentStage!=1){
            console.log("Recieved:" + jsonQuestions.currentStage)
          //   this.setState({level:jsonQuestions.currentStage})
          }

          console.log("Data retrieved to state")
        }else{
          alert("Data not recieved");
        }
      } catch (e) {
        alert('Failed to retrieve data.\n\n' + e)
      }
    }else{
      console.log("Question already populated")
    }
    this.setState({appReady:true})

  }

  componentWillMount(){
    this.retrieveData();
    console.log("Entering the " + this.state.skill + " at level " + this.state.level)
    
  }

  completeStage(){

    const {level,questions,skill} = this.state
    var currentStage = questions.currentStage
    if(currentStage==level){
      let stageQuestions = questions.questions[level-1];
      for(i=0;i<stageQuestions.length;i++){
        if(stageQuestions[i].checked==false){
          alert("Not all sections are completed for level " + level);
          return false;
        }
      }

      //check we have not hit last level
      var nextLevel = currentStage+1
      if(nextLevel==9){
      //update current stage value in storage
        this.updateCurrentStage()      
        this.refreshScreen(nextLevel)
      }else{
        alert("You have completed every level for " + skill + ", go have a party!!!. ")
      }
      return true;
    }else if(level>currentStage){
      alert("The previous levels need to be completed before ticking off level " + level)
    }else{
      alert("You have already completed this level")
    }
    return false
    
  }

   updateCurrentStage(){
        const {level,questions} = this.state 
        var data = questions;
        data.currentStage = level+1

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
    const {bgColor} = this.props

    
    if(questions.length==0){
        return <Text>Loading</Text>
    }else{
      return (  
         appReady ? (
          <View style={styles.container}>  
            <View style={styles.header}>
              <Text style={[styles.headerText,{color:bgColor}]}>{this.state.skill} Level {level} {questions.currentStage}</Text>      
            </View>

            <ScrollView style={styles.scroll}>  
                <ListQuestions questions={questions} skill={skill} level={level}/> 
            </ScrollView>
          
            <View style={styles.nav}>                
                <TouchableOpacity style={styles.button} onPress={()=>this.lowerLevel()}>
                    <FontAwesomeIcon icon={faBackward} size={ 25 }/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.completeStage()}>
                    <FontAwesomeIcon icon={faHome} size={ 45 }/>
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

  },
  nav:{
    flexDirection: 'row',
    position: 'absolute', left: 0, right: 0, bottom: 0,
  },
  button:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center'    
  },
});
  





