import React, { Component }from 'react';
import { StyleSheet, Text, View,Image,Button } from 'react-native';
import SkillButton from './SkillButton'

export default class AdventureSkills extends Component{

    render = () => {    
        return (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <SkillButton img={require('../assets/badges/camping-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/hiking-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/backwoods-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
            </View>
            <View style={styles.rowContainer}>
              <SkillButton img={require('../assets/badges/camping-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/hiking-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/backwoods-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
            </View>
            <View style={styles.rowContainer}>
              <SkillButton img={require('../assets/badges/camping-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/hiking-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
              <SkillButton img={require('../assets/badges/backwoods-base.png')} nav={() => this.props.navigation.navigate('Camping')}/>
            </View>            
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection:'row',
    justifyContent:"space-around",
  }
});