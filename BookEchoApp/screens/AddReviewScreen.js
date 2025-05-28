import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import StarRating from '../components/detailScreenComp/StarRating';
import Button from '../components/buttons/button';
import FormInput from '../components/inputs/FormInput';
import { useUser } from '../context/UserContext';
import typography from '../styles/typography';
import { Ionicons } from '@expo/vector-icons';
import { saveReview } from '../Model/ReviewModel';

const AddReviewScreen = ({ route, navigation }) => {
  const { userProfile } = useUser();
  const { bookId, bookTitle, rating: initialRating } = route.params;  // Trec onReviewSubmit
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(initialRating || 0);

  const handleSubmit = async () => {
    if (!title.trim() || !reviewText.trim()) {
      Alert.alert('Error', 'El títol i la ressenya no poden estar buits.');
      return;
    }

    try {
      // Desa la ressenya a Supabase
      await saveReview({
        userId: userProfile.id,
        bookId,
        title,
        review: reviewText,
        rating,
      });

      console.log('Ressenya desada correctament a Supabase.');

      // Torna enrere a la pantalla anterior (DetailScreen)
      navigation.goBack();
    } catch (error) {
      console.error('Error en desar la ressenya:', error.message);
      Alert.alert('Error', 'No s\'ha pogut desar la ressenya. Torna-ho a intentar.');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.pageTitle}>Afegir una ressenya</Text>
      <Text style={styles.bookTitle}>
        Per al llibre: <Text style={{ fontWeight: 'bold' }}>{bookTitle}</Text>
      </Text>

      <View style={styles.ratingDateRow}>
        <StarRating
          initialRating={rating}
          onRatingChange={(newRating) => setRating(newRating)}
          showButton={false}
          showTitle={false}
        />
        <View style={styles.dateRow}>
          <Ionicons name="time-outline" size={24} color="#626262" style={{ marginRight: 6 }} />
          <Text style={[typography.H3Regular, { color: '#626262' }]}>
            {new Date().toLocaleDateString('ca-ES')}
          </Text>
        </View>
      </View>

      <FormInput
        label="Títol"
        placeholder="Introdueix el títol de la ressenya"
        value={title}
        onChangeText={setTitle}
        icon={false}
      />

      <FormInput
        label="Ressenya"
        placeholder="Escriu la teva ressenya aquí..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        secureTextEntry={false}
        icon={false}
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
  ratingDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddReviewScreen;
