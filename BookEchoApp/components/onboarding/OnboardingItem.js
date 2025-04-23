import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/buttons/button';

export default function OnboardingItem({ item, isLastSlide }) {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Welcome'); //WelcomeScreen
    };

    return (
        <View style={[styles.container, { width, height }]}>
            <Image source={item.image} style={[styles.image, { width, height: 225 }]} />

            <View style={[styles.textContainer, { height: height * 0.3 }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                {isLastSlide && (
                    <View style={styles.finalSlide}>
                        <Text style={styles.finalTitle}>
                            Gaudeix de la lectura i converteix-te en un superlector!
                        </Text>

                        <Button
                            title="Començar ara!"
                            icon="book-open-page-variant"
                            onPress={handlePress}
                            color="#493d8a"
                            fontcolor="#fff"
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
    },
    textContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    finalSlide: {
        marginTop: 20,
        alignItems: 'center',
    },
    finalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#493d8a',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
});
