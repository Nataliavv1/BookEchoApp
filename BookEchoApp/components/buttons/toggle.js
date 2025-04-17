import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Toggle({ text1, text2, icon1, icon2, color }) {
  // Mantener el estado del toggle
  const [isToggled, setIsToggled] = useState(false);

  // Lógica para definir el color dependiendo del estado
  let colorSelected;
  if (color === 'orange') {
    colorSelected = isToggled ? '#F8794A' : '#FDD5C7'; // Si está activado, color naranja, si no, un color más claro
  } else if (color === 'green') {
    colorSelected = isToggled ? '#4CAF50' : '#A5D6A7'; // Si está activado, color verde, si no, verde más claro
  } else {
    colorSelected = '#F8794A'; // Default (naranja)
  }

  // Función para alternar el estado
  const toggleSwitch = () => setIsToggled(!isToggled);

  // Determinar el texto y el icono que se deben mostrar según el estado
  const text = isToggled ? text2 : text1;
  const icon = isToggled ? icon2 : icon1;

  return (
    <View>
      <TouchableOpacity 
        style={[styles.option, { backgroundColor: colorSelected }]} 
        onPress={toggleSwitch}
      >
        <MaterialCommunityIcons name={icon} size={24} color="#FFFFFF" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    minWidth: 120,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
});
