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
import AntDesign from '@expo/vector-icons/AntDesign';

import BackButton from '../buttons/backbutton';
import ButtonReadState from '../buttons/buttonReadState';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

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
          const rating = volume.averageRating;

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
              <View style={{ position: "relative" }}>
                {volume.imageLinks?.thumbnail ? (
                  <Image
                    source={{ uri: volume.imageLinks.thumbnail }}
                    style={styles.thumbnail}
                  />
                ) : (
                  <View style={[styles.thumbnail, styles.placeholder]} />
                )}

                <ButtonReadState style={styles.buttonReadState} />

                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={16} color="#f1c40f" />
                  <Text style={styles.ratingText}>
                    {rating !== undefined ? rating.toFixed(1) : '-'}
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.bookTitle, typography.bodyBold, { color: colors.HoverDarkGrey }]}
                numberOfLines={2}
              >
                {volume.title}
              </Text>

              {volume.authors && (
                <Text
                  style={[styles.bookAuthor, typography.labelMedium, { color: colors.MediumGrey }]}
                  numberOfLines={1}
                >
                  {volume.authors.join(", ")}
                </Text>
              )}
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
    flex: 1,
    marginRight: 24,
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
  buttonReadState: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  ratingContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#444",
  },
  bookTitle: {
    marginTop: 6,
    textAlign: "left",
  },
  bookAuthor: {
    marginTop: 2,
    textAlign: "left",
  },
});

export default PopularBooksScreen;
