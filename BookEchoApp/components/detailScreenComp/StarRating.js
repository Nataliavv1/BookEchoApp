import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../buttons/button';
import typography from '../../styles/typography';


export default function StarRating({
  onSubmit,
  onRatingChange,
  initialRating = 0,
  showButton = true,
  showTitle = true,
}) {
  const [selectedRating, setSelectedRating] = useState(initialRating);

  useEffect(() => {
    setSelectedRating(initialRating);
  }, [initialRating]);

  const handlePress = (rating) => {
    setSelectedRating(rating);
    onRatingChange?.(rating);
  };

  return (
    <View style={styles.container}>
      {showTitle && (
        <Text style={[typography.H3Medium, styles.title]}>
          Puntua
        </Text>
      )}

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handlePress(star)}>
            <Ionicons
              name={star <= selectedRating ? 'star' : 'star-outline'}
              size={24}
              color="#F8BD01"
            />
          </TouchableOpacity>
        ))}
      </View>

      {showButton && (
        <Button
          title="Afegeix ressenya"
          icon="plus"
          color="#47AC9E"
          fontcolor="#FFFFFF"
          onPress={() => onSubmit?.(selectedRating)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    color: '#12342D',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});