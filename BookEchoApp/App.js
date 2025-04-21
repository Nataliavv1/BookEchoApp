import React from 'react';

import Navigation from './Navigation';
import { useFonts } from 'expo-font';
import {
  Raleway_400Regular,
  Raleway_700Bold
} from '@expo-google-fonts/raleway';
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

//DESCOMENTAR UNA VEGADA QUE ES VEU EL ONBOARDING
// Component del formulari
//import Onboarding from './components/onboarding/Onboarding';

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
    Urbanist_400Regular,
    Urbanist_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (

        //DESCOMENTAR UNA VEGADA QUE ES VEU EL ONBOARDING

    //<Onboarding/>
    <Navigation />

  );
}