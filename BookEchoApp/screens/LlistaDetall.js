import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import colors from '../styles/colors';
import typography from '../styles/typography';
import BookCard from '../components/books/BookCard';

const LlistaDetall = ({ route, navigation }) => {
    const { llistaId, nom, numllibres } = route.params;
    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton />
                </View>
                <View style={styles.titlesBox}>
                    <Text style={[styles.title, typography.H1Bold]}>{nom}</Text>
                    <Text style={[styles.subtitle, typography.subtitleMedium]}>{numllibres} llibres</Text>
                </View>
{/*Aqui en teoria q retorni la llista de llibres*/}
                <View></View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 41,
        paddingHorizontal: 27,
        gap: 36,
    },
    header: {
        flex: 1,
    },
    titlesBox: {
        gap: 5,
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        color: colors.DarkTurquoise,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "left",
        color: colors.NormalGrey,
    }
});

export default LlistaDetall;