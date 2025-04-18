import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Importamos los íconos de Expo (aunque no se usan aún)
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { titol, imatge, autors } = route.params;
 // const { titol, imatge, puntuacio, autor } = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imatge }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{titol}</Text>
      <Text style={styles.author}>Autor: {autors}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
});

export default DetailScreen;
