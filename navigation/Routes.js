import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Router, Scene,Actions } from 'react-native-router-flux'
import Home from '../screens/Home'
import { SettingsScreen } from '../screens/SettingsScreen';
import { SkillScreen } from '../screens/SkillScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../component/Constants';
import AboutApp from '../screens/AboutApp';

const Routes = () => (
  <>
    <Text>Hello</Text>
    <Home/>
  </>
)

const styles = StyleSheet.create({
   navBar: {
      backgroundColor: Constants.PRIMARY_COLOUR,
      borderBottomStartRadius: 15,
      borderBottomEndRadius: 15
   },
   navTitle: {
      color: 'white',
      fontFamily: 'usuzi',
   }
})

export default Routes
