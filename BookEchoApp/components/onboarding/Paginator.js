import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

// Asegúrate de importar los colores desde el archivo correspondiente
import colors from '../../styles/colors';

export default function Paginator({ data, scrollX }) {
    // Obtenemos el ancho de la pantalla para calcular el rango de scroll
    const { width } = useWindowDimensions();

    return (
        // Contenedor de los puntos
        <View style={styles.container}>
            {/* Mapemos cada slide para generar un punto para cada uno */}
            {data.map((_, i) => {
                // Rango de scroll para animar cada punto (anterior, actual, siguiente)
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                // Animamos el tamaño del punto actual (más grande que los otros)
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 16, 8], // punto actual = 16, los otros = 8
                    extrapolate: 'clamp',    // limita los valores fuera del rango
                });

                // Animamos la opacidad del punto actual
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3], // punto actual más visible
                    extrapolate: 'clamp',
                });

                // Renderizamos el punto animado
                return (
                    <Animated.View
                        key={i.toString()}
                        style={[styles.dot, { width: dotWidth, opacity, backgroundColor: colors.NormalTurquoise }]} // Cambié el color aquí
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    // Contenedor horizontal de los puntos
    container: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estilo base para cada punto
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});
