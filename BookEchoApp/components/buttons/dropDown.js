import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

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
       <AntDesign name="filter" size={24} color="black" />
        <Text style={styles.buttonText}>{selected}</Text>
        <AntDesign name={open ? 'up' : 'down'} size={24} color="#333" />
      </TouchableOpacity>

      {open && (
        <View style={[styles.dropdown, typography.buttonBold]}>
        {options.map((option, index) => (
  <TouchableOpacity
    key={index}
    style={[
      styles.option,
      option === selected && styles.selectedOption // 👈 Añade esto
    ]}
    onPress={() => handleSelect(option)}
  >
    <Text style={[styles.optionText, typography.labelRegular]}>
      {option}
    </Text>
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
    
    padding: 10,
  //  borderRadius: 8,
   // borderWidth: 1,
 //   borderColor: '#F8794A',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: colors.LightHoverOrange,
   
    
    borderColor: '#ccc',
    elevation: 2,
    position: 'absolute',
       top: '100%',
       zIndex: 999,
       width: 150,
  },
   selectedOption: {
backgroundColor: colors.LightActiveOrange,
   },
  option: {
    padding: 10,
  },
  optionText: {
    color: colors.DarkGrey,
  },
});

export default Dropdown;
