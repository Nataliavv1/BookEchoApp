import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from '../buttons/backbutton';
import ButtonReadState from '../buttons/buttonReadState';
import BookCard from './BookCard'; // <<--- Importamos el componente
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";
const ITEMS_PER_PAGE = 12;

const PopularBooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => (
    <View style={styles.pagination}>
      <TouchableOpacity 
        onPress={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={[styles.pageButtonText, typography.labelExtraBold]}>Anterior</Text>
      </TouchableOpacity>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        if (page <= 5 || isActive) {
          return (
            <TouchableOpacity
              key={page}
              onPress={() => handlePageChange(page)}
              style={[styles.pageSquare, isActive && styles.activePageSquare]}
            >
              <Text
                style={[
                  styles.pageNumberText,
                  isActive && styles.activePageNumberText,
                  typography.labelExtraBold,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        }

        if (page === 6 && currentPage < 6) {
          return <Text key="ellipsis" style={[styles.ellipsis, typography.labelMedium]}>...</Text>;
        }

        return null;
      })}

      <TouchableOpacity 
        onPress={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
      >
        <Text style={[styles.pageButtonText, typography.labelExtraBold]}>Següent</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} color={colors.NormalTurquoise} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <BackButton />
        <Text style={[styles.header, typography.H1Bold, { color: colors.NormalTurquoise }]}>
          Llibres més populars
        </Text>
      </View>

      <View style={styles.contentArea}>
        <FlatList
          data={visibleBooks}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <BookCard
                book={item}
                onPress={() =>
                  navigation.navigate("Details", {
                    titol: item.volumeInfo.title,
                    autors: item.volumeInfo.authors,
                    imatge: item.volumeInfo.imageLinks?.thumbnail,
                    id: item.id,
                  })
                }
              />
            </View>
          )}
        />
      </View>

      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.NormalWhite,
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
  contentArea: {
    flex: 1,
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
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: colors.NormalWhite,
  },
  pageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: colors.NormalTurquoise,
  },
  pageButtonText: {
    color: colors.NormalWhite,
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.4,
    backgroundColor: colors.NormalGrey,
  },
  pageSquare: {
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.LightGrey,
    borderRadius: 6,
    minWidth: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  activePageSquare: {
    backgroundColor: colors.NormalTurquoise,
  },
  pageNumberText: {
    fontSize: 16,
    color: colors.DarkGrey,
    fontWeight: "bold",
  },
  activePageNumberText: {
    color: colors.NormalWhite,
  },
  ellipsis: {
    marginHorizontal: 5,
    fontSize: 16,
    color: colors.MediumGrey,
  },
});

export default PopularBooksScreen;
