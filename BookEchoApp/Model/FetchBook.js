import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const API_KEY = "AIzaSyAdrMfk5xKeXebgngAXQjrKshHuhAAklyM";
const BOOK_ID = "zyTCAlFPjgYC"; // Ejemplo de ID válido de Google Books

export default function BookFetcher() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${BOOK_ID}?key=${API_KEY}`
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!book) {
    return <Text>Error carregant el llibre.</Text>;
  }

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{book.volumeInfo.title}</Text>
      <Text>{book.volumeInfo.authors?.join(", ")}</Text>
      <Text>{book.volumeInfo.description}</Text>
    </View>
  );
}
