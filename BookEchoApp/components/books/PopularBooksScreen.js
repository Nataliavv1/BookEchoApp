import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from '../buttons/backbutton';


const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";

const PopularBooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllPopularBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&printType=books&maxResults=40&key=${API_KEY}`
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPopularBooks();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton />
        <Text style={styles.header}>Llibres més populars</Text>
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const volume = item.volumeInfo;
          return (
            <TouchableOpacity
              style={styles.bookItem}
              onPress={() =>
                navigation.navigate("Details", {
                  titol: volume.title,
                  autors: volume.authors,
                  imatge: volume.imageLinks?.thumbnail,
                  id: item.id,
                })
              }
            >
              {volume.imageLinks?.thumbnail ? (
                <Image
                  source={{ uri: volume.imageLinks.thumbnail }}
                  style={styles.thumbnail}
                />
              ) : (
                <View style={[styles.thumbnail, styles.placeholder]} />
              )}
              <Text style={styles.bookTitle} numberOfLines={2}>
                {volume.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // permite que el título se centre incluso con el botón a la izquierda
    marginRight: 24, // espacio para equilibrar visualmente el botón
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  bookItem: {
    width: "30%",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookTitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
  },
});

export default PopularBooksScreen;
