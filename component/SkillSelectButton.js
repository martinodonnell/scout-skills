import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';



export default class extends Component { 

  goToSkill = (skill) => {
    Actions.skillScreen({skill:this.props.skill,level:1,bgColour:this.props.bgColor})
  }

  render(){
    const {skill} = this.props.skill
    return (          
        <TouchableOpacity style={[styles.container, {backgroundColor: this.props.bgColor}]} onPress = {()=> this.goToSkill()}>
            <Text style={styles.text}>{this.props.skill}</Text>
        </TouchableOpacity>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor:'black',
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems:'center',
    marginTop:5
  },
  text: {
    color: 'white',
    fontFamily:'usuzi',
    fontSize:20
  },
});






  





