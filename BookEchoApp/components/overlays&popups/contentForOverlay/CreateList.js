import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importamos los íconos de Expo
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from "../../buttons/button";
import TextButton from "../../buttons/TextButton";
import FormInput from "../../inputs/FormInput";
import typography from "../../../styles/typography";
import colors from "../../../styles/colors";
import { createLlista } from "../../../Model/FetchLlistes";
import { useUser } from "../../../context/UserContext";




export default function CreateList() {
     const { userProfile } = useUser();
    const navigation = useNavigation();
const [nomllista, setNomllista] = useState("");
    return (
        <View style={styles.container}>
            <Text style={[styles.title, typography.H2Bold]}>Crear llista de llibres</Text>
           <View style={styles.inputContainer}>
   <Text style={[styles.label, typography.bodyBold]}>Nom de la llista</Text>
           <FormInput
                                  placeholder="Introdueix el nom de la llista"
                                  value={nomllista}
                                  onChangeText={setNomllista}
                                  secureTextEntry={false}
                                  icon={false}
                              />
           </View>
         

            <View style={styles.buttons}>
                <Button title={"Cancel·la"}></Button>

                <Button 
    title="Crear"
    onPress={async () => {
        if (!nomllista.trim()) {
            alert("El nom de la llista no pot estar buit.");
            return;
        }

        await createLlista(
            nomllista,
            userProfile.id,           // ID del usuario (asegúrate de tener acceso)
            false,             // es_predeterminada
            null,              // tipus_predeterminat (si no aplica)
            'https://bizqtmcljmduxrqwmdsh.supabase.co/storage/v1/object/public/llistes//defaultImage.png',             // image (si no hay imagen aún)
        );

        navigation.goBack(); // O redirige a otra pantalla si lo prefieres
    }}
/>

                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "left",
        gap: 24,
    },
    inputContainer: {
gap: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "left",
        color: colors.DarkerGrey,
    },
    label: {
        color: colors.NormalGrey,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 31,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

    },
    buttonText: {
        marginLeft: 10,
    },
});
