import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importamos los íconos de Expo
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FormInput from "../components/inputs/FormInput";
import BackButton from "../components/buttons/backbutton";
import colors from "../styles/colors";

import Button from "../components/buttons/button";

const EntradaScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <BackButton></BackButton>
            <Text style={styles.title}>Afegeix un llibre que falta</Text>
            <Text>Pas 1</Text>
            <View style={styles.bottomContainer}>
                <Text>Primer cercarem per codi ISBN</Text>
               <FormInput></FormInput>
               <Text>Un ISBN és un número únic de 10 o 13 dígits assignat a cada edició publicada d'un llibre.</Text>
               <Button title={'Cancel·la'}></Button>
               <Button title={'Següent'}></Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.NormalTurquoise,
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
        color: colors.LightWhite,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

    },
    buttonText: {
        marginLeft: 10,
    },
    option: {
        width: '95%',           
        borderTopWidth: 1,         
        borderTopColor: 'green',   
        paddingVertical: 15, 
        paddingHorizontal: 20,
      },
      bottomContainer:{
        flex: 1,
        backgroundColor: colors.LightWhite,
        width: '100%',
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
      }

});

export default EntradaScreen;
