import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// Importem colors i tipografia des de la carpeta styles
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function SearchInput({ value, onChangeText }) {
    // Estat per gestionar si el input té el focus o no
    const [isFocused, setIsFocused] = useState(false); 
    const [isHovered, setIsHovered] = useState(false); // Estat per detectar hover (en web)

    // Determinar el color del borde segons l'estat
    const getBorderColor = () => {
        if (isFocused) return colors.NormalActiveOrange;
        if (isHovered) return colors.NormalHoverOrange;
        return colors.NormalOrange;
    };

    // Determinar el color de fons segons l'estat
    const getBackgroundColor = () => {
        if (isFocused || isHovered) return colors.LightOrange;
        return colors.LightWhite;
    };

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: getBorderColor(),
                    backgroundColor: getBackgroundColor()
                }
            ]}
            // Hover per a dispositius amb ratolí (web)
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icona de cerca */}
            <AntDesign name="search1" size={18} color={colors.LightActiveGrey} style={styles.icon} />

            <TextInput
                style={[
                    styles.input,
                    {
                        color: colors.LightActiveGrey,
                        fontFamily: typography.labels.regular // Tipografia de labels
                    }
                ]}
                placeholder="Buscar llibres..."
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)} // Quan l'input obté el focus (hover)
                onBlur={() => setIsFocused(false)}  // Quan l'input perd el focus
                placeholderTextColor={colors.LightActiveGrey}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // L'input ocupa tot l'espai disponible
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
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
        outlineStyle: 'none', // Eliminar el color negre del camp en web
    },
});
