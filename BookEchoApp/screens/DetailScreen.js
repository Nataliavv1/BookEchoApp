import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importamos los íconos de Expo
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailScreen = (titol, imatge, puntuacio) => {
    const navigation = useNavigation();
    return (
        <View>
            <Image
                source={{ imatge }}
                style={styles.thumbnail}
            />
            <Text>{titol}</Text>
            <Text>{autor}</Text>
            <Text>{puntuacio}</Text>
            <View>

            </View>

        </View>
    )
}