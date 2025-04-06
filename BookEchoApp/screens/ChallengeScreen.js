import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChallengeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Challenge Screen</Text>
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

export default ChallengeScreen;
