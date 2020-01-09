import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';



export default class extends Component { 

  constructor(props){
    super(props);  
  }

  goToSkill = (skill) => {
    Actions.skillScreen({skill:this.props.skill,level:1})
  }

  render(){
    const {skill} = this.props.skill
    return (          
        <TouchableOpacity style={styles.container} onPress = {()=> this.goToSkill()}>
            <Text style={styles.text}>{this.props.skill}</Text>
        </TouchableOpacity>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:'white',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'red',
    marginTop:5
  },
  text: {
    color: 'white',
    fontFamily:'usuzi',
    fontSize:20
  },
});






  





