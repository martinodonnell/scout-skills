import React, {Component} from 'react';
import { StyleSheet, View,Button,AsyncStorage,Text, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ListQuestions from './ListQuestions';
import * as Constants from './Constants'


export default class SkillScreen extends Component { 

  constructor(props){
    super(props);
    this.state = {
      questions:[],
      skill:this.props.skill,
      level:this.props.level
    }
  }

  retrieveData = async () => {
    const {skill} = this.state
    try {
      const recieveQuestions = await AsyncStorage.getItem('@' + skill);
      if (recieveQuestions !== null) {
        let jsonQuestions = JSON.parse(recieveQuestions);
        this.setState({ questions:jsonQuestions});

        console.log("Data retrieved to state")
      }else{
        alert("Data not recieved");
      }
    } catch (e) {
      alert('Failed to retrieve data.\n\n' + e)
    }
  }

  componentWillMount(){
    this.retrieveData();
  }

  completeStage(){
    let stageQuestions = this.state.questions.questions[this.state.level-1];
    for(i=0;i<stageQuestions.length;i++){
      if(stageQuestions[i].checked==false){
        alert("Not all done");
        return false;
      }
    }
    alert("All done");
    return true;
  }

  lowerLevel(){
    // chanage these to refresh. Didn;t work for some reason
    const {skill, level} = this.state;
    if(level>1){
      newLevel = level - 1
      this.setState({level:newLevel})
      Actions.refresh({key: 'skillScreen',skill:skill,level:newLevel})

    }
  }

   higherLevel(){
    // chanage these to refresh. Didn;t work for some reason
    const {skill, level} = this.state;

    if(level<9){
      newLevel = level + 1
      this.setState({level:newLevel})
      Actions.refresh({key: 'skillScreen',skill:skill,level:newLevel})

    }
  }

  render(){
    const {questions, level} = this.state

    
    if(questions.length==0){
        return <Text>Loading</Text>
    }else{
      return (  
          <View>          
              <ListQuestions questions={questions} skill={this.props.skill} level={level}/> 
              <Button
                title="Complete"
                onPress={()=>this.completeStage()}
            
              /> 
              <Button
                title="Back"
                onPress={()=>this.lowerLevel()}
            
              /> 
              <Button
                title="Forward"
                onPress={()=>this.higherLevel()}
            
              /> 
            
          </View>
        
      );
    }

  }
}


  





