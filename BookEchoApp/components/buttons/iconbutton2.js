import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { cloneElement } from 'react';

export default function IconButton({ onPress, children }) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    // Clona el icono y le fuerza el color blanco
    const whiteIcon = React.isValidElement(children)
        ? cloneElement(children, { color: 'white' })
        : children;

    // Estilo dinámico basado en estado
    const backgroundColor = isPressed
        ? '#C6613B'
        : isHovered
        ? '#DF6D43'
        : '#F8794A';

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
