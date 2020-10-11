import React, { Component, useEffect, useState } from 'react';
import { AppRegistry, View, AsyncStorage, Text } from 'react-native';
import Routes from './navigation/Routes';
import * as Font from 'expo-font';
import { setUpInitalFiles } from './services/AsyncService';

const App = () => {
   const [appReady, setAppReady] = useState(false)

   useEffect(() => {
      const setup = async () => {
         await Font.loadAsync({
            'usuzi': require('./assets/fonts/usuzi.ttf'),
         });
         setUpInitalFiles()
         setAppReady(true)
      }
      setup()

   }, [])

   return (
      appReady && (
         <Routes />
      )
   )
}

export default App