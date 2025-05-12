import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// Importem els estils
import colors from '../../styles/colors';
import typography from '../../styles/typography';

// Componente de input de búsqueda amb icona de lupa
export default function SearchInput({ value, onChangeText }) {
    const [isFocused, setIsFocused] = useState(false); 

    return (
        <View style={[styles.container, isFocused && styles.containerFocused]}>
            <AntDesign 
                name="search1" 
                size={15} 
                color={isFocused ? colors.LightActiveGrey : '#E7E7E7'} 
                style={styles.icon} 
            />
            <TextInput
                style={[styles.input, typography.labelRegular]}
                placeholder="Buscar llibres..."
                placeholderTextColor={isFocused ? colors.LightActiveGrey : '#E7E7E7'}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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
        borderColor: colors.NormalOrange,
        borderRadius: 5,
        paddingHorizontal: 13,
        height: 32,
        marginRight: 10,
    },
    containerFocused: {
        borderColor: colors.NormalOrange,
        backgroundColor: colors.LightOrange,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        color: colors.NormalGrey,
        paddingVertical: 6,
    },
});
