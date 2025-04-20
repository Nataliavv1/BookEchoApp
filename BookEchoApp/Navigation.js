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
import DetailScreen from "./screens/DetailScreen";
import ScanScreen from "./screens/ScanScreen";

// Importamos los íconos de Expo
import AntDesign from '@expo/vector-icons/AntDesign';


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
                    tabBarIcon: ({ color }) => (<AntDesign name="plus" size={24} color={color} />),
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
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Details" component={DetailScreen}/>
                <Stack.Screen name="ScanScreen" component={ScanScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );

}
