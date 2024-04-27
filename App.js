import React, {  useEffect, useState } from 'react';
import Routes from './navigation/Routes';
import * as Font from 'expo-font';
import { setUpInitalFiles } from './services/AsyncService';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
         <SafeAreaProvider>
            <Routes/>
            <StatusBar style="light" />
         </SafeAreaProvider>
      )
   )
}

export default App
