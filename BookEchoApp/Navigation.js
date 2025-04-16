// Importamos React
import React from "react";

// Importamos los navegadores
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos las pantallas (screens)
import HomeScreen from "./screens/HomeScreen";
import LibraryScreen from "./screens/LibraryScreen";
import AddScreen from "./screens/AddScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StackScreen from "./screens/StackScreen";

// Importamos los íconos de Expo
import AntDesign from '@expo/vector-icons/AntDesign';

//-----------------------------------------------------STACK NAVIGATOR-------------------------------------------------------
// Creamos una variable que contenga nuestro Stack Navigator
const HomeStackNavigator = createNativeStackNavigator();

// Definimos el Stack Navigator
function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen" // La pantalla inicial dentro del Stack
        >
            {/* Pantalla HomeScreen dentro del Stack */}
            <HomeStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

            {/* Pantalla StackScreen dentro del Stack */}
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
            />

        </HomeStackNavigator.Navigator>
    );
}

//----------------------------------------------------TAB NAVIGATOR----------------------------------------------------------
// Creamos el Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Definimos el Tab Navigator
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Inici" // Define la pantalla inicial del Tab Navigator
            screenOptions={{
                // Estilo del footer (barra de navegación inferior)
                tabBarStyle: {
                    backgroundColor: "#47AC9E", // Color de fondo
                    height: 115, // Altura de la barra
                    borderTopLeftRadius: 10, // Bordes redondeados superiores
                    borderTopRightRadius: 10,
                    position: "absolute", // Asegura un buen renderizado de los bordes
                    left: 0,
                    right: 0,
                    bottom: 0,
                    paddingBottom: 10, // Espaciado inferior para los íconos
                    paddingTop: 25, // Espaciado superior
                },

                // Estilo de los íconos y etiquetas
                tabBarActiveTintColor: "#F7F7F7",
                tabBarInactiveTintColor: "#FFFFFF",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                    padding: 5,
                }
            }}>

            {/* Tab de Inicio con el Stack Navigator */}
            <Tab.Screen
                name="Inici"
                component={HomeScreen} // Aquí cargamos el Stack Navigator en lugar de un solo componente
                options={{
                    tabBarLabel: 'Inici',
                    tabBarIcon: ({ color }) => (<AntDesign name="home" size={24} color={color} />),
                    headerShown: false, // Ocultamos el header en este tab
                }} />

            {/* Tab de Biblioteca */}
            <Tab.Screen
                name="Biblioteca"
                component={LibraryScreen}
                options={{
                    tabBarLabel: 'Biblioteca',
                    tabBarIcon: ({ color }) => (<AntDesign name="book" size={24} color={color} />),
                    headerShown: false, // Ocultamos el header en este tab
                }} />

            {/* Tab de Agregar */}
            <Tab.Screen
                name="Afegeix"
                component={AddScreen}
                options={{
                    tabBarLabel: 'Afegeix',
                    tabBarIcon: ({ color }) => (<AntDesign name="plus" size={24} color={color} />),
                    headerShown: false, // Ocultamos el header en este tab
                }} />

            {/* Tab de Retos */}
            <Tab.Screen
                name="Reptes"
                component={ChallengeScreen}
                options={{
                    tabBarLabel: 'Reptes',
                    tabBarIcon: ({ color }) => (<AntDesign name="staro" size={24} color={color} />),
                    tabBarBadge: 3, // Muestra un contador en el ícono
                    headerShown: false, // Ocultamos el header en este tab
                }} />

            {/* Tab de Perfil */}
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => (<AntDesign name="user" size={24} color={color} />),
                    headerShown: false, // Ocultamos el header en este tab
                }} />
        </Tab.Navigator>
    );
}

//------------------------------------------------------EXPORTACIÓN-----------------------------------------------------------
// Exportamos el componente principal de la navegación
export default function Navigation() {
    return (
        <NavigationContainer initialRouteName="Inici">
            <MyTabs />
        </NavigationContainer>
    );
}
