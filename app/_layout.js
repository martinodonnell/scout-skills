import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { setUpInitalFiles } from '../services/AsyncService';


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
      <Slot />
      <StatusBar style="light" />
    </SafeAreaProvider>
  )
}
