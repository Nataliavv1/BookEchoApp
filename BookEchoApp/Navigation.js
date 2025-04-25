// Importamos React y hooks necesarios
import React, { useEffect, useState } from "react";

// Importamos los navegadores
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos AsyncStorage para guardar si el onboarding fue completado
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importamos el ChallengeProvider
import { ChallengeProvider } from './context/ChallengeContext';

// Importamos el componente de onboarding
import Onboarding from './components/onboarding/Onboarding';

// Importamos las pantallas de autenticación
import WelcomeScreen from './screens/Supabase/WelcomeScreen';
import LoginScreen from './screens/Supabase/LoginScreen';
import RegisterScreen from './screens/Supabase/RegisterScreen';

// Importamos las pantallas (screens)
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import AddScreen from "./screens/AddScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DetailScreen from "./screens/DetailScreen";
import AllChallengesScreen from "./screens/AllChallengesScreen";
//import ScanScreen from "./screens/ScanScreen";

// Importamos los íconos de Expo
import AntDesign from '@expo/vector-icons/AntDesign';
import Overlay from "./components/overlays&popups/Overlay";


//----------------------------------------------------TAB NAVIGATOR----------------------------------------------------------
// Creamos el Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Inici"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#47AC9E",
                    height: 115,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    paddingBottom: 10,
                    paddingTop: 25,
                },
                tabBarActiveTintColor: "#F7F7F7",
                tabBarInactiveTintColor: "#FFFFFF",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: 5,
                }
            }}>
            <Tab.Screen
                name="Inici"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inici',
                    tabBarIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Biblioteca"
                component={LibraryScreen}
                options={{
                    tabBarLabel: 'Biblioteca',
                    tabBarIcon: ({ color }) => (<AntDesign name="book" size={24} color={color} />),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Afegeix"
                component={AddScreen}
                options={{
                    tabBarLabel: 'Afegeix',
                    tabBarIcon: ({ color }) => (
                        <Overlay color={color} icon={'plus'} />  // Usa tu componente Overlay aquí 
                        
                    ),
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Reptes"
                component={ChallengeScreen}
                options={{
                    tabBarLabel: 'Reptes',
                    tabBarIcon: ({ color }) => (<AntDesign name="staro" size={24} color={color} />),
                    tabBarBadge: 3,
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (<AntDesign name="user" size={24} color={color} />),
                    headerShown: false,
                }} />
        </Tab.Navigator>
    );
}


//-----------------------------------------------------STACK NAVIGATOR-------------------------------------------------------
const Stack = createNativeStackNavigator();

export default function Navigation() {
    const [onboardingCompleted, setOnboardingCompleted] = useState(null); // null = cargando

    // Comprobamos si el usuario ya ha completado el onboarding
    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const value = await AsyncStorage.getItem('@onboardingCompleted');
            setOnboardingCompleted(value === 'true');
        };
        checkOnboardingStatus();
    }, []);

    // Guardamos que el onboarding fue completado
    const handleOnboardingFinish = async () => {
        await AsyncStorage.setItem('@onboardingCompleted', 'true');
        setOnboardingCompleted(true);
    };

    // Mientras cargamos el estado, no renderizamos nada
    if (onboardingCompleted === null) return null;

    return (
        <ChallengeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={onboardingCompleted ? "Welcome" : "Onboarding"}>
                    {/* Pantalla de Onboarding (solo la primera vez) */}
                    <Stack.Screen
                        name="Onboarding"
                        options={{ headerShown: false }}
                    >
                        {props => <Onboarding {...props} onFinish={handleOnboardingFinish} />}
                    </Stack.Screen>

                    {/*Pantalla de 1º Welcome*/}
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

                    {/*Pantalla de 2º Registre i 3º Login*/}
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

                    {/* Pantallas principales de la app después del login */}
                    <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AllChallengesScreen" component={AllChallengesScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </ChallengeProvider> 
    );
}