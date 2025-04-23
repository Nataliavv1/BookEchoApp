import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function TrophyCard({ image, title }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    backgroundColor: '#EDF7F5',
    borderRadius: 12,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  image: {
    width: 62,
    height: 60,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#000000',
  },
});