import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Default');

  const options = ['Default', 'By Date', 'A-Z'];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setOpen(!open)}>
        <Text style={styles.buttonText}>{selected}</Text>
        <AntDesign name={open ? 'up' : 'down'} size={16} color="#333" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginTop: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF2ED',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F8794A',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
});

export default Dropdown;
