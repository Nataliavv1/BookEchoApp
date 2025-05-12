// components/TopicsBooks.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Usamos Ionicons para los iconos

// Importamos colores y tipografía
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function TopicsBooks() {
  // Datos de ejemplo para géneros de libros
  const topics = [
    { id: 1, name: 'Ficción', icon: 'book', color: colors.NormalOrange, subtitle: 'Libros de narrativa' },
    { id: 2, name: 'Misterio', icon: 'search', color: colors.LightActiveGrey, subtitle: 'Historias intrigantes' },
    { id: 3, name: 'Fantasía', icon: 'magic', color: colors.NormalOrange, subtitle: 'Mundos mágicos' },
    { id: 4, name: 'Ciencia', icon: 'ios-planet', color: colors.LightActiveGrey, subtitle: 'Explora el universo' },
    // Puedes agregar más géneros aquí
  ];

  return (
    <View style={styles.container}>
      {/* Título del apartado de géneros */}
      <Text style={[styles.title, typography.labelRegular]}>Temas de Libros</Text>

      {/* Contenedor de los géneros con Scroll Horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {topics.map((topic) => (
          <TouchableOpacity key={topic.id} style={[styles.topicCard, { backgroundColor: topic.color }]}>
            {/* Icono */}
            <Ionicons name={topic.icon} size={30} color="#fff" style={styles.icon} />
            {/* Subtítulo */}
            <Text style={styles.subtitle}>{topic.subtitle}</Text>
            {/* Nombre del tema */}
            <Text style={styles.topicName}>{topic.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: colors.NormalOrange,  // Título con color Naranja
    marginBottom: 15,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  topicCard: {
    width: 150,
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,  // Espacio entre los botones
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,  // Para efectos de sombra en Android
  },
  icon: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  topicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
});
