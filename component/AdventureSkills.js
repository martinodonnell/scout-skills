import React, { Component }from 'react';
import { StyleSheet, TouchableOpacity, Text, View,Image,Button } from 'react-native';
import SkillButton from '../component/SkillButton'


export default class AdventureSkills extends Component{

    render = () => {    
        return (
          <View style={styles.titleContainer}>
            <View style={styles.container}>
              {/* <SkillButton img={require('../assets/badges/camping-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/hiking-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/backwoods-base.png')} nav={() => this.props.navigation.navigate('Camping')}/> */}
            </View>
            
          </View>
        );
    }
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center', 
    flexDirection:'row',
  },
   titleContainer:{
    flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',  
  
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
  button:{
    flex:1,
    alignItems: 'center',
  },
  skill_img:{
    // alignItems: 'center',
    width: 125,
    height: 125,
    resizeMode: 'contain'
  }
});