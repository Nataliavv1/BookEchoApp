import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SharePopup from './SharePopup'; // Ajusta ruta si hace falta
import AddBookToList from './AddBookToList';

export default function BookOptions({bookTitle, bookId}) {
  const [shareVisible, setShareVisible] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);

  const handleShareOpen = () => {
    setShareVisible(true);
  };

  const handleShareClose = () => {
    setShareVisible(false);
  };

  const handleSaveOpen = () => {
    setSaveVisible(true);
  }
   const handleSaveClose = () => {
    setSaveVisible(false);
  }

  return (
    <View>
      <Text style={styles.title}>Opcions de Llibre</Text>

      <TouchableOpacity style={styles.option} onPress={handleSaveOpen}>
        <View style={styles.row}>
          <AntDesign name="plus" size={24} color="black" />
          <Text style={styles.buttonText}>Afegeix a una llista de llibres</Text>
        </View>
      </TouchableOpacity>
      <AddBookToList visible={saveVisible} onCancel={handleSaveClose} bookTitle={bookTitle} bookId={bookId}></AddBookToList>

      <TouchableOpacity style={styles.option} onPress={handleShareOpen}>
        <View style={styles.row}>
          <AntDesign name="sharealt" size={24} color="black" />
          <Text style={styles.buttonText}>Comparteix</Text>
        </View>
      </TouchableOpacity>

      <SharePopup visible={shareVisible} onCancel={handleShareClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  option: {
    width: '95%',
    borderTopWidth: 1,
    borderTopColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
