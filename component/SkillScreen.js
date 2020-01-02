import React, {Component} from 'react';
import { StyleSheet, View,Button,AsyncStorage,Text } from 'react-native';

import ListQuestions from './ListQuestions';
import * as Constants from './Constants'


export default class SkillScreen extends Component { 

  constructor(props){
    super(props);
    this.state = {
      questions:[],
      level:this.props.level
    }
  }

  retrieveData = async () => {
    try {
      const recieveQuestions = await AsyncStorage.getItem('@' + Constants.CAMPING);
      if (recieveQuestions !== null) {
        let jsonQuestions = JSON.parse(recieveQuestions);
        this.setState({ questions:jsonQuestions});

        console.log("Data saved to state")
      }else{
        alert("Saved data not recieved");
      }
    } catch (e) {
      alert('Failed to load name.\n\n' + e)
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

  render(){
    const {questions, level} = this.state

    
    if(questions.length==0){
        return <Text>Loading</Text>
    }else{
      return (  
          <View>          
              <ListQuestions questions={questions} skill="Camping" level={level}/> 
              <Button
                title="Complete"
                onPress={()=>this.completeStage()}
            
              />     
          </View>
        
      );
    }

  }
}


  





