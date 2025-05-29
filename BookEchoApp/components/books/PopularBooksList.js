import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors';
import typography from '../../styles/typography';
import BookCard from './BookCard';

const API_KEY = 'AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM';

const PopularBooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&printType=books&maxResults=10&key=${API_KEY}`
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error('Error fetching popular books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, typography.H2Bold, { color: colors.HoverDarkGrey }]}>
          Llibres més populars
        </Text>
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('PopularBooksScreen')}
        >
          <Text style={[typography.labelExtraBold, { color: colors.NormalTurquoise }]}>
            Veure més
          </Text>
          <AntDesign name="right" size={15} color={colors.NormalTurquoise} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() =>
              navigation.navigate('Details', {
                titol: item.volumeInfo.title,
                autors: item.volumeInfo.authors,
                imatge: item.volumeInfo.imageLinks?.thumbnail,
                id: item.id,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    paddingRight: 20,
  },
});

export default PopularBooksList;
