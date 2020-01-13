import React,{Component} from 'react'
import { StyleSheet,TouchableOpacity, Text,View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Constants from '../component/Constants';
import SkillSelectButton from '../component/SkillSelectButton';


const goToUserSelect = () => {
    Actions.userSelect()
  } 
export default class extends Component {   

  

  render() {
     return (
        <View style = {styles.container}>
            <SkillSelectButton skill={Constants.CAMPING} textColor='#009F54'/>
            <SkillSelectButton skill={Constants.BACKWOODS} textColor='#559632'/>
            <SkillSelectButton skill={Constants.PIONEERING} textColor='#004E50'/>
            
            <SkillSelectButton skill={Constants.EMERGENCIES} textColor='#F57A41'/>
            <SkillSelectButton skill={Constants.HIKING} textColor='#F57921'/>
            <SkillSelectButton skill={Constants.AIR} textColor='#007CC2'/>

            <SkillSelectButton skill={Constants.PADDLING} textColor='#0668B3'/>
            <SkillSelectButton skill={Constants.ROWING} textColor='#0668B3'/>
            <SkillSelectButton skill={Constants.SAILING} textColor='#0060AA'/>
            <TouchableOpacity onPress={goToUserSelect}>
              <Text>Users</Text>
            </TouchableOpacity>  
          
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