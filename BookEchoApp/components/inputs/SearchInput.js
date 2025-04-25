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
                placeholderTextColor="#C7C7C7"
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F8794A',
        borderRadius: 5,
        paddingHorizontal: 13,
        height: 40,
        marginRight: 10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#3B3B3B',
        paddingVertical: 0,
    },
    inputFocused: {
        borderColor: '#DF6D43',
    },
});