import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ButtonReadState from '../buttons/buttonReadState';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const BookCard = ({ book, onPress }) => {
  const { title, authors, imageLinks, averageRating } = book.volumeInfo;
const volumeInfo = book.volumeInfo;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ position: 'relative' }}>
        {imageLinks?.thumbnail ? (
          <Image source={{ uri: imageLinks.thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.placeholder]} />
        )}

        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={18} color={colors.NormalYellow} />
          <Text style={[styles.ratingText, typography.H3Regular]}>
            {averageRating !== undefined ? averageRating.toFixed(1) : '-'}
          </Text>
        </View>
        
{console.log('[BookCard] book →', book)}
        <ButtonReadState 
        style={styles.buttonReadState} 
book={{
    id: volumeInfo.industryIdentifiers?.[0]?.identifier,
    isbn: volumeInfo.industryIdentifiers?.[0]?.identifier,
    descripcio: volumeInfo.description,
    autors: volumeInfo.authors,
    categories: volumeInfo.categories,
    imatge: volumeInfo.imageLinks?.thumbnail,
    titol: volumeInfo.title,
    puntuaciogoogle: volumeInfo.averageRating,
    npuntuaciogoogle: volumeInfo.ratingsCount,
    puntuaciomitjana: 0,
    npuntuaciomitjana: 0,
  }}
        />
      </View>

      <Text style={[styles.bookTitle, typography.subtitleBold]} numberOfLines={2}>
        {title}
      </Text>
      {authors && (
        <Text style={[styles.bookAuthor, typography.labelMedium]} numberOfLines={1}>
          {authors.join(', ')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 15,
    width: 120,
  },
  thumbnail: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: colors.NormalWhite,
    borderRadius: 5,
    minWidth: 52,
    paddingHorizontal: 8,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.NormalGrey,
  },
  bookTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bookAuthor: {
    fontSize: 12,
    color: colors.NormalGrey,
    marginTop: 2,
    textAlign: 'left',
  },
  buttonReadState: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default BookCard;
