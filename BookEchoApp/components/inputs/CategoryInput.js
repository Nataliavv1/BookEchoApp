import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const CategoryInput = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const addCategory = () => {
    const trimmed = category.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setCategory('');
    }
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Escriu una categoria"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
          onSubmitEditing={addCategory}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addCategory} style={styles.addButton}>
          <Text style={styles.addButtonText}>Afegir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagsContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => removeCategory(cat)}
            style={styles.tag}
          >
            <Text>{cat} ✕</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: colors.NormalOrange,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.LightWhite,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: colors.NormalOrange,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.LightOrange,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 7,
    margin: 3,
  },
});

export default CategoryInput;
