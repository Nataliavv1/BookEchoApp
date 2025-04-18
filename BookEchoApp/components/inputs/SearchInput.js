import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchInput({ value, onChangeText }) {
    // Estat per gestionar si el input té el focus o no
    const [isFocused, setIsFocused] = useState(false); 

    return (
        <View style={styles.container}>
            <AntDesign name="search1" size={18} color="#E7E7E7" style={styles.icon} />
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]} // Aplicar l'estil quan el input té focus
                placeholder="Buscar llibres..."
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)} // Quan l'input obté el focus (hover)
                onBlur={() => setIsFocused(false)}  // Quan l'input perd el focus
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // L'input ocupa tot l'espai disponible
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F8794A', // Color del bord per defecte
        borderRadius: 5,
        paddingHorizontal: 13,
        paddingVertical: 3,
        height: 32,
        marginRight: 10,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#E7E7E7',
        outlineStyle: 'none', // Eliminar el color negre del camp en web
    },
    inputFocused: {
        borderColor: '#DF6D43', // Color del borde quan està enfocat (hover)
    },
});
