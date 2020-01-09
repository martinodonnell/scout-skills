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
            <SkillSelectButton skill={Constants.CAMPING}/>
            <SkillSelectButton skill={Constants.BACKWOODS}/>
            <SkillSelectButton skill={Constants.PIONEERING}/>
            
            <SkillSelectButton skill={Constants.EMERGENCIES}/>
            <SkillSelectButton skill={Constants.HIKING}/>
            <SkillSelectButton skill={Constants.AIR}/>

            <SkillSelectButton skill={Constants.PADDLING}/>
            <SkillSelectButton skill={Constants.ROWING}/>
            <SkillSelectButton skill={Constants.SAILING}/>
          
         </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    flex:1,
    backgroundColor:'blue',

  }
});