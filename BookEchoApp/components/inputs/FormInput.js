import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

//Creem el component reutilitzable
export default function FormInput({
    value,                 // Valor del camp (controlat pel component pare)
    onChangeText,          // Funció que s'executa quan l'usuari escriu
    placeholder = '',      // Text que apareix quan el camp està buit
    icon = 'edit',         // Nom de l'icona que es mostrarà
    secureTextEntry = false, // Si és true, el text s'oculta (per contrasenyes)
    keyboardType = 'default', // Tipus de teclat (email-address, numeric, etc.)
}) {
//Estat per controlar si l'usuari fa clic
const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <AntDesign name={icon} size={18} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} // Quan el focus es perd, es reinicia l'estat
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  focusedContainer: {
    borderColor: '#47AC9E',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});