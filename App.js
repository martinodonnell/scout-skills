import React, { Component } from 'react';
import { AppRegistry, View,AsyncStorage } from 'react-native';
import Routes from './component/Routes.js'
import * as Constants from './component/Constants'


class App extends Component {

   componentWillMount(){
      const campingData = require('./assets/json/camping.json');
      this.save(campingData);
   }

   save = async questions => {
      try {
         await AsyncStorage.setItem('@' + Constants.CAMPING, JSON.stringify(questions))
         console.log(Constants.CAMPING + ' Data successfully saved!')
      } catch (e) {
         console.log('Failed to save.' + Constants.CAMPING + ':' + e)
      }
   }

   render() {
      return (
         <Routes />
      )
   }
}
export default App




