import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Screen</Text>
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
    },
});

export default AddScreen;
