import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ChallengeCard({
  image,
  title,
  description,
  completed,
  total,
  backgroundColor,
  progressColor,
  isActive = true, // nova prop
}) {
  const progress = completed / total;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isActive ? backgroundColor : '#EDEDED',
          opacity: isActive ? 1 : 0.95, // fa tot més apagat
        },
      ]}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={[styles.title, !isActive && { color: '#999' }]}>{title}</Text>
        <Text style={[styles.description, !isActive && { color: '#AAA' }]}>{description}</Text>
        <View style={styles.progressBackground}>
          {isActive && (
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: progressColor,
                },
              ]}
            />
          )}
        </View>
      </View>
      {!isActive && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>No iniciat</Text>
        </View>
      )}
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

  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#B0B0B0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    zIndex: 1,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Raleway_700Bold',
  },

});