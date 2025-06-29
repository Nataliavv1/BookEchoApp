import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";

const GoogleBooksList = ({ query, style, detailsPreselectedOption, bookIds }) => {
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!query) return;  // Si query es null o vacío, no hacer fetch

    const fetchBooks = async () => {
      try {
        if (bookIds != undefined) {
          const responses = await Promise.all(
            bookIds.map(id => fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`))
          )
          const data = await Promise.all(responses.map(r => r.json()));
          setBooks(data)
          } else {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`
          );
          const data = await response.json();
          setBooks(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <View style={[styles.container, style]}>
      {books.length === 0 ? (
        <Text style={styles.noResults}>No hay resultados</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const volume = item.volumeInfo;
            return (
              <TouchableOpacity onPress={() =>
                navigation.navigate('Details', {
                  titol: volume.title,
                  autors: volume.authors,
                  id: item.id,
                  imatge: volume.imageLinks?.thumbnail,
                  preselectedOption: detailsPreselectedOption || 'option1'
                })
              }>
                <View style={styles.bookItem}>
                  {volume.imageLinks?.thumbnail && (
                    <Image
                      source={{ uri: volume.imageLinks.thumbnail }}
                      style={styles.thumbnail}
                    />
                  )}
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>{volume.title}</Text>
                    {volume.authors && (
                      <Text style={styles.author}>{volume.authors.join(', ')}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  bookItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 90,
    marginRight: 15,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#555",
  },
  noResults: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});

export default GoogleBooksList;
