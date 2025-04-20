import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Creem la navegació per poder moure'ns a les pantalles "Inici Sessió" i "Registre"
export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escaneja, Guarda, Llegeix</Text>

      {/* Botó per navegar a la pàgina Registre */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registra't</Text>
      </TouchableOpacity>

      {/* Botó per navegar a la pàgina Log In */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Inicia sessió</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#358177',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#47AC9E',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
