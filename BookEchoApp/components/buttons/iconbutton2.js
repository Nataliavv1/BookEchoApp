import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { cloneElement } from 'react';

// Importar colores
import colors from '../../styles/colors';

export default function IconButton({ onPress, children }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    // Clona la icona i li aplica el color definit al sistema de disseny
    const whiteIcon = React.isValidElement(children)
        ? cloneElement(children, { color: colors.LightWhite })
        : children;

    // Estilo dinámico basado en el estado del botón
    const backgroundColor = isPressed
        ? colors.NormalActiveOrange
        : isHovered
        ? colors.NormalHoverOrange
        : colors.NormalOrange;

    return (
        <Pressable
            onPress={onPress}
            style={[styles.iconButton, { backgroundColor }]}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {whiteIcon}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        width: 32,
        height: 32,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    }
});
