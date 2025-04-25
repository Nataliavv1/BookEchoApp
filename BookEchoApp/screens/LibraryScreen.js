import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/buttons/button";
import ButtonReadState from "../components/buttons/buttonReadState";
import IconButton from "../components/buttons/iconbutton";
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";
import Dropdown from "../components/buttons/dropDown";

const LibraryScreen = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Library Screen</Text>
<Toggle text1="Les meves llistes" text2="Tots els llibres"></Toggle>
<View>
    
<IconButton icon={'view-list'}></IconButton>
        <Text>Default</Text>
       
        <IconButton icon={'plus'}></IconButton>

    <Dropdown></Dropdown>

</View>

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
      //  color: colors. NormalTurquoise,
    },
});

export default LibraryScreen;
