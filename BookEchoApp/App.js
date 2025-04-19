import React from 'react';
import Navigation from './Navigation';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';


export default function App(){
    const [fontsLoaded] = useFonts({
        Raleway_400Regular,
        Raleway_700Bold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return(
      
            <Navigation/>
   
    );
}