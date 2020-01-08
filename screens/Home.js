import React,{Component,View} from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Constants from '../component/Constants'


const goToSkill = (skill) => {
   Actions.skillScreen({skill:skill,level:1})
}

export default class extends Component {   

  render() {
     return (
         <TouchableOpacity style = {{ margin: 128 }} onPress = {()=> goToSkill(Constants.CAMPING)}>
            <Text>Camping </Text>
         </TouchableOpacity>
            
      )
  }
}