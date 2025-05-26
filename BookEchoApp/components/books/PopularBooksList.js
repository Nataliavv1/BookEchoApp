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

import ButtonReadState from '../buttons/buttonReadState'; // Importa tu botón con estado

import colors from '../../styles/colors';
import typography from '../../styles/typography';

const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";

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
        console.error("Error fetching popular books:", error);
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
          onPress={() => navigation.navigate("PopularBooksScreen")}
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

                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={24} color="#f1c40f" />
                  <Text style={styles.ratingText}>
                    {rating !== undefined ? rating.toFixed(1) : '-'}
                  </Text>
                </View>

                {/* Botón importado con estado, posicionado arriba a la derecha */}
                <ButtonReadState style={styles.buttonReadState} />
              </View>

              <Text style={styles.bookTitle} numberOfLines={2}>
                {volume.title}
              </Text>
              {volume.authors && (
                <Text style={styles.bookAuthor} numberOfLines={1}>
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
    marginTop: 20,
    paddingLeft: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  seeMoreButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContent: {
    paddingRight: 20,
  },
  bookItem: {
    marginRight: 15,
    width: 120,
  },
  ratingContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "white",
    borderRadius: 5,
    width: 52,
    height: 28,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  thumbnail: {
    width: 120,
    height: 180,
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
    fontWeight: "bold",
    textAlign: "left",
  },
  bookAuthor: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    textAlign: "left",
  },
  buttonReadState: {
    position: 'absolute',
    top: 8,
    right: 8,
  }
});

export default PopularBooksList;
