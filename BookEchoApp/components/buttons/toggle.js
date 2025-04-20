import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Toggle({ text1, text2, icon1, icon2, color }) {
  // Mantener el estado del toggle
  const [selected, setSelected] = useState('false');

  // Lógica para definir el color dependiendo del estado
  const options = [
    { key: 'option1', label: text1, icon: icon1 },
    { key: 'option2', label: text2, icon: icon2 },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}  
          style={[styles.option, selected === option.key && styles.optionSelected]}
          onPress={() =>
            setSelected(selected === option.key ? 'none' : option.key)
          }
        >
          <MaterialCommunityIcons 
            name={option.icon} 
            size={24} 
            color={selected === option.key ? '#fff' : '#F8794A'} 
          />
          <Text style={[styles.text, selected === option.key && styles.buttonText]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FEF2ED',
    width: 332,
    padding: 3,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    minWidth: 120,
    width: '50%',
   
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  optionSelected: {
    backgroundColor: '#F8794A',
  },
  buttonText: {
    color: '#fff',
  }
});

