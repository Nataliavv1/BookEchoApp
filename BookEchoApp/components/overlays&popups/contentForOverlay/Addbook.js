import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importamos los íconos de Expo
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function AddBook() {
    const navigation = useNavigation();

   return (
        <View style={styles.container}>
            <Text style={styles.title}>Afegir llibre</Text>
           
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Entrada')}>
           <View>
                <View style={styles.row}>
                    <AntDesign name="search1" size={24} color="black" />
                    <Text style={styles.buttonText}>Per cerca</Text>
                </View>
           </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Scan')}>
           <View>
                <View style={styles.row} >
                    <AntDesign name="camerao" size={24} color="black" />
                    <Text style={styles.buttonText}>Per escaneig</Text> 
                </View>
           </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Entrada')}>
           <View>
                <View style={styles.row}>
                <MaterialCommunityIcons name="keyboard-outline" size={24} color="black" />

                    <Text style={styles.buttonText}>Per entrada</Text>
                </View>
           </View>
            </TouchableOpacity>

        </View>
    );
}

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

});
