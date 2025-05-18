import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import StarRating from '../components/detailScreenComp/StarRating';
import Button from '../components/buttons/button';

const AddReviewScreen = ({ route, navigation }) => {
  const { bookId, bookTitle, rating: initialRating } = route.params;
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(initialRating || 0);

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      Alert.alert('Error', 'La ressenya no pot estar buida.');
      return;
    }

    console.log('Review enviada per al llibre:', bookTitle);
    console.log('Rating:', rating);
    console.log('Text:', reviewText);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.pageTitle}>Afegir una ressenya</Text>
      <Text style={styles.bookTitle}>
        Per al llibre: <Text style={{ fontWeight: 'bold' }}>{bookTitle}</Text>
      </Text>

      <StarRating
        initialRating={rating}
        onRatingChange={(newRating) => setRating(newRating)}
        showButton={false}
        showTitle={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Escriu la teva ressenya aquí..."
        multiline
        numberOfLines={6}
        value={reviewText}
        onChangeText={setReviewText}
      />

      <Button
        title="Enviar ressenya"
        onPress={handleSubmit}
        color="#47AC9E"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#358177',
  },
  bookTitle: {
    fontSize: 16,
    color: '#626262',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    marginBottom: 24,
    borderRadius: 6,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
});

export default AddReviewScreen;

