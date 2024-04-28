import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { setUpInitalFiles } from '../services/AsyncService';
import * as Constants from '../component/Constants';

export default function HomeLayout() {
  const [appReady, setAppReady] = useState(false)
  const [fontsLoaded] = useFonts({
    'usuzi': require('../assets/fonts/usuzi.ttf'),
  });

  useEffect(() => {
    const setup = async () => {
       setUpInitalFiles()
       setAppReady(true)
    }
    setup()

 }, [])

  if(!(fontsLoaded && appReady)) {
    return null
  }
  return  (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Constants.PRIMARY_COLOUR
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <StatusBar style="light" />
    </SafeAreaProvider>
  )
}
