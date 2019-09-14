import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AdventureSkills from './screens/AdventureSkills'
import Camping from './screens/Camping'


const AppNavigator = createStackNavigator(
  {
    AdventureSkills: AdventureSkills,
    Camping:Camping
  },
  {
    initialRouteName: 'AdventureSkills',
  }
);

const AppContainer = createAppContainer(AppNavigator);


class App extends Component { 
 
render(){
  return (  
      <AppContainer />
      );
  }
}

export default App;


  





