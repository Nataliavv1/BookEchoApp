import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/buttons/button";
import ButtonReadState from "../components/buttons/buttonReadState";

const LibraryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Library Screen</Text>
            <Button title={'Library'} icon="camera-outline" />
            <ButtonReadState/>
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

export default LibraryScreen;
