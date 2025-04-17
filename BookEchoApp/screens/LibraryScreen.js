import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/buttons/button";
import ButtonReadState from "../components/buttons/buttonReadState";
import IconButton from "../components/buttons/iconbutton";
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";

const LibraryScreen = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Library Screen</Text>
            <Button title={'Library'} icon="camera-outline"/>
            <ButtonReadState/>
            <IconButton/>
            <Overlay title={'Opcions de llista'} delateText={'Eliminar llista'} editText={'Editar llista'} contentType={'EditDelate'}/>
            <Toggle
  text1="Activar"
  text2="Desactivar"
  icon1="toggle-switch"
  icon2="toggle-switch-off"
  color="orange"
/>

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
