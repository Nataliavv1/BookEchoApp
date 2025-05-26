import React from 'react';
import Navigation from './Navigation';
import { UserProvider } from './context/UserContext';
import { ChallengeProvider } from './context/ChallengeContext';  // IMPORTA ChallengeProvider

import { useFonts } from 'expo-font';
import {
  Raleway_400Regular,
  Raleway_700Bold
} from '@expo-google-fonts/raleway';
import {
  Urbanist_400Regular,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

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
    <UserProvider>
      <ChallengeProvider>
        <Navigation />
      </ChallengeProvider>
    </UserProvider>
  );
}
