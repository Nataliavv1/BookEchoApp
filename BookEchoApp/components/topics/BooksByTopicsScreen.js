import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackButton from '../buttons/backbutton';

export default function BooksByTopicScreen({ route }) {
  const { topic } = route.params;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${topic}&maxResults=20`
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error('Error al obtener libros:', error);
      }
    };

    fetchBooks();
  }, [topic]);

  const renderItem = ({ item }) => {
    const volumeInfo = item.volumeInfo;
    return (
      <TouchableOpacity style={styles.card}>
        {volumeInfo.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: volumeInfo.imageLinks.thumbnail }}
            style={styles.thumbnail}
          />
        ) : (
          <View style={styles.noImage}><Text>Sense imatge</Text></View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{volumeInfo.title}</Text>
          <Text style={styles.author}>
            {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Autor desconegut'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.heading}>Llibres de {topic}</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
    resizeMode: 'cover',
  },
  noImage: {
    width: 60,
    height: 90,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});
