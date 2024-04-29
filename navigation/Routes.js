import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Home from '../screens/Home'
import * as Constants from '../component/Constants';

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
