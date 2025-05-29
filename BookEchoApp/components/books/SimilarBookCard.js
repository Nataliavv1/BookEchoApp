// components/books/SimilarBookCard.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BookCard from './BookCard';

const SimilarBookCard = ({ book }) => {
  const navigation = useNavigation();

  // Formateamos el objeto para que BookCard entienda la estructura que espera
  const formattedBook = {
    volumeInfo: {
      title: book.title,
      authors: book.authors,
      imageLinks: {
        thumbnail: book.image,
      },
      averageRating: book.averageRating,
    },
  };

  const handlePress = () => {
    navigation.push('DetailScreen', {
      id: book.id,
      titol: book.title,
      autors: book.authors,
      imatge: book.image,
    });
  };

  return <BookCard book={formattedBook} onPress={handlePress} />;
};

export default SimilarBookCard;
