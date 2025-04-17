// Header.js
import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Mi Biblioteca</Text>
            <TextInput
                style={styles.input}
                placeholder="Buscar libros..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        padding: 20,
        backgroundColor: "#47AC9E",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: "#FFF",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        width: "100%",
        padding: 10,
        fontSize: 16,
    },
});

export default Header;

