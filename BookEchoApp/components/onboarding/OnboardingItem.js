import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/buttons/button';

// Importem els arxius d'estil
import typography from '../../styles/typography';
import colors from '../../styles/colors';

export default function OnboardingItem({ item, isLastSlide }) {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Welcome'); // Navigate to Welcome Screen
    };

    return (
        <View style={[styles.container, { width, height }]}>
            <Image source={item.image} style={[styles.image, { width, height: 225 }]} />

            <View style={[styles.textContainer, { height: height * 0.3 }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                {isLastSlide && (
                    <View style={styles.finalSlide}>
                        <Text style={styles.finalTitle }>
                            Gaudeix de la lectura i converteix-te en un superlector!
                        </Text>

                        <Button
                            title="Començar ara!"
                            onPress={handlePress}
                            color={colors.NormalTurquoise}
                            fontcolor="#fff"
                            icon="book"
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
        marginBottom:25,
    },
    textContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        ...typography.H2ExtraBold,
        color: colors.DarkGrey,
        marginBottom: 25,
        textAlign: 'center',
    },

    description: {
        ...typography.subtitleMedium,
        color: colors.DarkGrey,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    finalSlide: {
        marginTop: 20,
        alignItems: 'center',
    },
    finalTitle: {
        ...typography.H3ExtraBold,
        color: colors.DarkGrey,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
});
