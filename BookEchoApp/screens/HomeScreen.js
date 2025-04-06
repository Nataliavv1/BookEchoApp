import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";

const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header/>
            <Text style={styles.title}>Home Screen</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Stack")} style={styles.button}>
                <Text style={styles.buttonText}>Ir a Stack Screen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#47AC9E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default HomeScreen;
