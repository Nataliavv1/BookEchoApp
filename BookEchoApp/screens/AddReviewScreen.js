import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import StarRating from '../components/detailScreenComp/StarRating';
import Button from '../components/buttons/button';
import FormInput from '../components/inputs/FormInput';
import { useUser } from '../context/UserContext';
import typography from '../styles/typography';
import { Ionicons } from '@expo/vector-icons';


const AddReviewScreen = ({ route, navigation }) => {
  const { userProfile } = useUser();
  const { bookId, bookTitle, rating: initialRating, onReviewSubmit } = route.params;
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(initialRating || 0);

  const handleSubmit = () => {
    if (!title.trim() || !reviewText.trim()) {
      Alert.alert('Error', 'El títol i la ressenya no poden estar buits.');
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('ca-ES');

    const newReview = {
      title,
      text: reviewText,
      rating,
      date: formattedDate,
      userName: userProfile?.username || 'Usuari',
      userImageUri: userProfile?.avatar_url || null,
    };

    console.log('Review enviada per al llibre:', bookTitle);
    console.log('Nova ressenya:', newReview);

    if (onReviewSubmit) {
      onReviewSubmit(newReview);
    }

    navigation.goBack();
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

