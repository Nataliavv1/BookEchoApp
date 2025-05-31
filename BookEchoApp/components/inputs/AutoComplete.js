import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Importem els estils
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const AutoComplete = ({ initialAuthors = [] }) => {
  const [query, setQuery] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  // Quan canvia initialAuthors, afegim els autors si no estan ja seleccionats
  useEffect(() => {
    if (initialAuthors.length > 0) {
      setSelectedAuthors(prev =>
        [...prev, ...initialAuthors.filter(a => !prev.includes(a))]
      );
    }
  }, [initialAuthors]);

  useEffect(() => {
    if (query.length < 3) {
      setAuthors([]);
      return;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${query}&maxResults=20`)
      .then(res => res.json())
      .then(data => {
        if (!data.items) return;

        const allAuthors = data.items.flatMap(item => item.volumeInfo.authors || []);
        const uniqueAuthors = [...new Set(allAuthors)];

        setAuthors(uniqueAuthors);
      });
  }, [query]);

  const addAuthor = (author) => {
    if (!selectedAuthors.includes(author)) {
      setSelectedAuthors([...selectedAuthors, author]);
    }
    setQuery('');
    setAuthors([]);
  };

  const removeAuthor = (author) => {
    setSelectedAuthors(selectedAuthors.filter(a => a !== author));
  };

  return (
    <View>
      <TextInput
        placeholder="Comença escrivint per afegir un autor"
        value={query}
        onChangeText={setQuery}
        style={styles.container}
      />

      {/* Mostrem només el primer autor suggerit */}
      {authors.length > 0 && (
        <TouchableOpacity
          onPress={() => addAuthor(authors[0])}
          style={[{ maxHeight: 50, marginTop: 5, padding: 10, backgroundColor: colors.LightActiveOrange }, typography.labelRegular]}
        >
          <Text>{authors[0]}</Text>
        </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
        {selectedAuthors.map(author => (
          <TouchableOpacity
            key={author}
            onPress={() => removeAuthor(author)}
            style={{ backgroundColor: colors.LightOrange, paddingHorizontal: 10, paddingVertical: 10, margin: 3, borderRadius: 7 }}
          >
            <Text>{author}  ✕</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.LightWhite,
    borderWidth: 1,
    borderColor: colors.NormalOrange,
    borderRadius: 5,
    paddingLeft: 28,
    paddingRight: 12,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default AutoComplete;
