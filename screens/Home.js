import React,{Component} from 'react'
import { StyleSheet,TouchableOpacity, Text,View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Constants from '../component/Constants'


const goToSkill = (skill) => {
   Actions.skillScreen({skill:skill,level:1})
}

export default class extends Component {   

  render() {
     return (
        <View style = {styles.container}>
            <TouchableOpacity onPress = {()=> goToSkill(Constants.CAMPING)}>
               <Text>Camping </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> goToSkill(Constants.CAMPING)}>
               <Text>Camping </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> goToSkill(Constants.CAMPING)}>
               <Text>Camping </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {()=> goToSkill(Constants.CAMPING)}>
               <Text>Camping </Text>
            </TouchableOpacity>
         </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    borderColor:'red',
    borderRadius: 4,
    borderWidth: 0.5,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  }
});