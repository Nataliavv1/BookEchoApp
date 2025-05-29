import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ChallengeCard({ image, title, description, completed, total, backgroundColor, progressColor }) {
  const progress = completed / total;

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: progressColor }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    minWidth: 250,
    padding: 10,
    alignItems: 'center',
    gap: 13,
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    borderRadius: 12,
    marginVertical: 10,
     shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#2C2C2C',
    fontFamily: 'Raleway_700Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 2,
  },
  description: {
    color: '#626262',
    fontFamily: 'Raleway_400Regular',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
  },
});