//BOTÓ SIMPLE NOMÉS TEXT
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// Importar colors i tipografia
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function TextButton({ title, onPress, variant = 'filled',style }) {
    //Estat per gestionar si el botó està pressionat o hover
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Definim les diferents variants del botons (fill Orange, fill Turuqesa i borde només)
    const variants = {
        filled: {
            default: colors.NormalOrange,
            hover: colors.NormalHoverOrange,
            active: colors.NormalActiveOrange,
            textColor: colors.LightWhite,
        },
        filledTurquoise: {  // Botó de color turquesa
            default: colors.NormalTurquoise,
            hover: colors.NormalHoverTurquoise,
            active: colors.NormalActiveTurquoise,
            textColor: colors.LightWhite,
          },
        outline: {
            default: 'transparent',
            textColor: colors.LightWhite,
            borderColor: colors.LightWhite,
            borderHover: colors.NormalHoverWhite,
            borderActive: colors.NormalActiveWhite,
        },
    };

    //S'estableix quina variant de colors s'utilitza segons el tipus de botó
    const current = variant === 'filledTurquoise' ? variants.filledTurquoise : variants[variant];

    //Logica pel botó amb el color de fons
    const backgroundColor =
        variant === 'filled' || variant === 'filledTurquoise'
            ? isPressed
                ? current.active
                : isHovered
                    ? current.hover
                    : current.default
            : 'transparent';

    //Logica pel botó color de borde
    const borderColor =
        variant === 'outline'
            ? isPressed
                ? current.borderActive
                : isHovered
                    ? current.borderHover
                    : current.borderColor
            : 'transparent';

    return (
        // El botó està embolicat en un Pressable perquè pugui detectar interaccions tàctils
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                {
                    backgroundColor,
                    borderColor,
                    borderWidth: variant === 'outline' ? 1 : 0,
                },
                style,
            ]}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {/* Aquí va el text del botó amb la tipografia aplicada */}
            <Text style={[styles.text, typography.buttonRegular, { color: current.textColor }]}>
                {title} {/* El títol que es passa com a prop */}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        // Tipografía aplicada desde typography.buttonRegular
    },
});
