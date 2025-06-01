import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import colors from '../styles/colors';
import typography from '../styles/typography';
import BookCard from '../components/books/BookCard';
import { fetchLlibresByLlistaId } from '../Model/fetchLlibresByLlistaId';

const LlistaDetall = ({ route, navigation }) => {
    const { llistaId, nom, numllibres } = route.params;
    const [llibres, setLlibres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarLlibres() {
            try {
                const result = await fetchLlibresByLlistaId(llistaId);
                setLlibres(result);
            } catch (err) {
                setError('Error carregant els llibres');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        carregarLlibres();
    }, [llistaId]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton />
                </View>
                <View style={styles.titlesBox}>
                    <Text style={[styles.title, typography.H1Bold]}>{nom}</Text>
                    <Text style={[styles.subtitle, typography.subtitleMedium]}>{numllibres} llibres</Text>
                </View>

                {loading && <ActivityIndicator size="large" color={colors.DarkTurquoise} />}
                {error && <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text>}

                {/* Aquí mostrem la llista de llibres */}
<View style={styles.booksContainer}>
  {llibres.map((book) => (
    <BookCard
      key={book.id}
      book={book}                             
      onPress={() =>
        navigation.navigate('DetallLlibre', { id: book.id })
      }
    />
  ))}
  
</View>

            </View>
        </ScrollView>
    );
};

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
