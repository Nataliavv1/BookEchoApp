// Header.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchInput from '../components/inputs/SearchInput';
import IconButton from '../components/buttons/iconbutton2';
import AntDesign from '@expo/vector-icons/AntDesign';  // Icono para el filtro
import FontAwesome from '@expo/vector-icons/FontAwesome';  // Icono d'usuari TENIR EN COMPTE QUE QUAN ES FACI EL LOG IN S'HA DE CANVIAR PER LA IMATGE DE L'USUARI

import colors from '../styles/colors';
import typography from '../styles/typography';


export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <FontAwesome name="user-circle-o" size={42} color="gray" />
        <Text style={styles.userText}>User</Text> {/* TENIR EN COMPTE QUE QUAN ES FACI EL LOG IN HA DE CANVIAR-SE PEL NOM DEL USUARI*/}
      </View>

      <View style={styles.searchRow}>
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
        <IconButton onPress={() => console.log('Filtrar')}>
          <AntDesign name="filter" size={22} color="black" />
        </IconButton>
      </View>

      <View style={styles.spacing}></View> {/* Per poder deixar un espai de 18px */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingHorizontal: 27,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10, // Bordes redondeados inferiores
    borderBottomRightRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 15, // Añadí paddingLeft para asegurarse de que el espacio sea consistente
  },
  userText: {
    fontSize: 20,
    color: '#3B3B3B3B',
    marginLeft: 15, // También puedes ajustar este margen si es necesario
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacing: {
    marginBottom: 25, // Espacio de 25px debajo del header
  },
});
