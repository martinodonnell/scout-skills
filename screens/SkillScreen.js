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
      questions:[],
      skill:this.props.skill,
      level:this.props.level,
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
    console.log("Entering the " + this.state.skill + " at level " + this.state.level)
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
          <View style={styles.container}>  
            <View style={styles.header}>
              <Text style={[styles.headerText,{color:this.props.bgColour}]}>{this.state.skill} Level {this.props.level}</Text>      
            </View>

            <ScrollView style={styles.scroll}>  
                <ListQuestions questions={questions} skill={this.props.skill} level={level}/> 
            </ScrollView>
          
            <View style={styles.nav2}>                
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
        
      );
    }

  }
}


const styles = StyleSheet.create({
  nav2:{
    // flex: 1,
    flexDirection: 'row',
    // justifyContent:'center',
    position: 'absolute', left: 0, right: 0, bottom: 0,
  },
  button:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center'

    
  },
  container: {
    marginTop: 25,
    flex: 4,
  },
  headerText:{
    fontSize:30,
    fontFamily:'usuzi',
  },
  header:{
    backgroundColor:'white',
    alignItems:'center',
  },
  scroll:{
  },
  nav:{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  icon:{
    height:50,
  }
});
  





