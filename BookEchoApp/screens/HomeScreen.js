import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import GoogleBooksList from "./GoogleBooksList";
import TopicsBooks from '../components/topics/TopicsBooks';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TopicsBooks />

      {/* Mostrar overlay con resultados solo si hay búsqueda válida */}
      {searchQuery.length >= 3 && (
        <GoogleBooksList 
          query={searchQuery} 
          style={styles.overlay} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',   // importante para el overlay
  },
  overlay: {
    position: 'absolute',
    top: 130,               // ajusta este valor según altura real de tu Header + espacio
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 100,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
