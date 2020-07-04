import React, { useEffect } from 'react'; //, { useState, useEffect }
import { AppLoading } from 'expo';
import { StatusBar, AsyncStorage } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, Ubuntu_400Regular, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

//import getRealm from './src/services/realm'

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
    Ubuntu_400Regular
  }); 

  if(!fontsLoaded){
    return <AppLoading />
  }    

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
