import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';

import slides from './slides';  // Asegúrate de que este es el archivo correcto donde está tu array "slides"
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';

// Importamos los colores
import colors from '../../styles/colors';

// Importamos el botón con icono
import IconButton from '../buttons/iconbutton2';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Onboarding({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleFinish = () => {
        navigation.replace('Welcome');
    };

    return (
        <View style={styles.container}> 
            {/* Botón para cerrar onboarding */}
            <View style={styles.closeButtonContainer}>
                <IconButton onPress={handleFinish}>
                    <AntDesign name="close" size={24} color="black" />
                </IconButton>
            </View>

            <FlatList
                data={slides}  // Asegúrate de que no se esté modificando el array "slides" en ningún otro lado
                renderItem={({ item, index }) => (
                    <OnboardingItem
                        item={item}
                        isLastSlide={index === slides.length - 1}
                        onFinish={handleFinish}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
            />
            <Paginator data={slides} scrollX={scrollX} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LightHoverTurquoise,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    }
});
