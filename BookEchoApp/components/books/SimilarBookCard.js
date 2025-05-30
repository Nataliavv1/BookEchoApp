// components/books/SimilarBookCard.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BookCard from './BookCard';

const SimilarBookCard = ({ book }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.push('Details', {
      id: book.id,
      titol: book.title,
      autors: book.authors,
      imatge: book.image,
    });
  };

  // Adaptamos el formato para que lo entienda BookCard
  const formattedBook = {
    volumeInfo: {
      title: book.title,
      authors: book.authors,
      imageLinks: book.image ? { thumbnail: book.image } : undefined,
      averageRating: book.averageRating || 0,
    },
  };

  return <BookCard book={formattedBook} onPress={handlePress} />;
};

export default SimilarBookCard;
