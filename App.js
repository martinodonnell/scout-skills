import React, { Component } from 'react';
import { AppRegistry, View,AsyncStorage,Text} from 'react-native';
import Routes from './component/Routes.js'
import * as Constants from './component/Constants'
import * as Font from 'expo-font';

class App extends Component {
   
   state = {
    appReady: false,
    dev:true
  };


   async componentWillMount(){
      await Font.loadAsync({
         'usuzi': require('./assets/fonts/usuzi.ttf'),
      });

      //need to wait for these to happen before continuing
      this.save(require('./assets/json/1_camping.json'),Constants.CAMPING);
      this.save(require('./assets/json/2_backwoods.json'),Constants.BACKWOODS);
      this.save(require('./assets/json/3_pioneering.json'),Constants.PIONEERING);
      this.save(require('./assets/json/4_emergencies.json'),Constants.EMERGENCIES);
      this.save(require('./assets/json/5_hillwalking.json'),Constants.HIKING);
      this.save(require('./assets/json/6_air.json'),Constants.AIR);
      this.save(require('./assets/json/7_paddling.json'),Constants.PADDLING);
      this.save(require('./assets/json/8_rowing.json'),Constants.ROWING);
      this.save(require('./assets/json/9_sailing.json'),Constants.SAILING);
      this.setState({ appReady: true });

   }

   save = async (questions,skill) => {
      try {
         var isDataSaved =  await AsyncStorage.getItem('@' + skill)
         if(!isDataSaved || this.state.dev){
            await AsyncStorage.setItem('@' + skill, JSON.stringify(questions))
            console.log(skill + ' Data successfully saved!')
         }else{
            console.log(skill + ' is already saved')
         }
      } catch (e) {
         console.log('Failed to save.' + skill + ':' + e)
      }
   }

   render() {
      
      return (            
            this.state.appReady ? (
               <Routes/>
            ) : null
            
               
      )
   }
}
export default App




