import React, { Component, useEffect, useState } from 'react';
import { AppRegistry, View, AsyncStorage, Text } from 'react-native';
import Routes from './component/Routes.js'
import * as Constants from './component/Constants'
import * as Font from 'expo-font';

const App = () => {
   const [appReady, setAppReady] = useState(false)

   useEffect(() => {
      const setup = async () => {
         await Font.loadAsync({
            'usuzi': require('./assets/fonts/usuzi.ttf'),
         });

         save(require('./assets/json/1_camping.json'), Constants.CAMPING);
         save(require('./assets/json/1_camping_answers.json'), Constants.CAMPING + "A");//testing 
         save(require('./assets/json/2_backwoods.json'), Constants.BACKWOODS);
         save(require('./assets/json/3_pioneering.json'), Constants.PIONEERING);
         save(require('./assets/json/4_emergencies.json'), Constants.EMERGENCIES);
         save(require('./assets/json/5_hillwalking.json'), Constants.HIKING);
         save(require('./assets/json/6_air.json'), Constants.AIR);
         save(require('./assets/json/7_paddling.json'), Constants.PADDLING);
         save(require('./assets/json/8_rowing.json'), Constants.ROWING);
         save(require('./assets/json/9_sailing.json'), Constants.SAILING);
         save(require('./assets/json/10_currentLevels.json'), Constants.CURRENTLEVELS);

         setAppReady(true)
      }
      setup()

   }, [])

   const save = async (questions, skill) => {
      try {
         var isDataSaved = await AsyncStorage.getItem('@' + skill)
         if (!isDataSaved) {
            await AsyncStorage.setItem('@' + skill, JSON.stringify(questions))
         } else {
            console.log(skill + ' is already saved')
         }
      } catch (e) {
         console.log('Failed to save.' + skill + ':' + e)
      }
   }

   return (
      appReady ? (
         <Routes />
      ) : null
   )
}

export default App