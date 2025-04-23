import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

export default function Paginator({ data, scrollX }) {
    // Obtenim l'amplada de la pantalla per calcular el rang de scroll
    const { width } = useWindowDimensions();

    return (
        // Contenidor dels punts
        <View style={styles.container}>
            {/* Mapegem cada slide per generar un punt per cadascun */}
            {data.map((_, i) => {
                // Rang de scroll per animar cada punt (anterior, actual, següent)
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                // Animem l'amplada del punt actual (més gran que els altres)
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 16, 8], // punt actual = 16, els altres = 8
                    extrapolate: 'clamp',    // limita els valors fora del rang
                });

                // Animem l'opacitat del punt actual
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3], // punt actual més visible
                    extrapolate: 'clamp',
                });

                // Renderitzem el punt animat
                return (
                    <Animated.View
                        key={i.toString()}
                        style={[styles.dot, { width: dotWidth, opacity }]}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    // Contenidor horitzontal dels dots
    container: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Estil base per a cada punt
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#493d8a',
        marginHorizontal: 4,
    },
});
