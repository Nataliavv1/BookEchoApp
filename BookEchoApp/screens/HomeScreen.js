import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import GoogleBooksList from "./GoogleBooksList"; // asegúrate de que el path esté bien

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <GoogleBooksList query={searchQuery} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#47AC9E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default HomeScreen;
