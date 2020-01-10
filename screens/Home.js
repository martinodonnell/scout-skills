import React,{Component} from 'react'
import { StyleSheet,TouchableOpacity, Text,View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Constants from '../component/Constants';
import SkillSelectButton from '../component/SkillSelectButton';

const goToSkill = (skill) => {
   Actions.skillScreen({skill:skill,level:1})
}

export default class extends Component {   

  render() {
     return (
        <View style = {styles.container}>
            <SkillSelectButton skill={Constants.CAMPING} bgColor='#009F54'/>
            <SkillSelectButton skill={Constants.BACKWOODS} bgColor='#559632'/>
            <SkillSelectButton skill={Constants.PIONEERING} bgColor='#004E50'/>
            
            <SkillSelectButton skill={Constants.EMERGENCIES} bgColor='#F57A41'/>
            <SkillSelectButton skill={Constants.HIKING} bgColor='#F57921'/>
            <SkillSelectButton skill={Constants.AIR} bgColor='#007CC2'/>

            <SkillSelectButton skill={Constants.PADDLING} bgColor='#0668B3'/>
            <SkillSelectButton skill={Constants.ROWING} bgColor='#0668B3'/>
            <SkillSelectButton skill={Constants.SAILING} bgColor='#0060AA'/>
          
         </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    flex:1,
    backgroundColor:'white',

  }
});