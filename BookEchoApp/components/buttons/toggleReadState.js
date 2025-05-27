import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useToggleReadState} from '../../Model/useToggleReadState';


export default function ToggleReadState({ book, listIds }) {
  const { selected, toggle } = useToggleReadState(book, listIds);

  const options = [
    { key: 'toRead',  label: 'Per llegir', icon: 'bookmark-outline' },
    { key: 'reading', label: 'Llegint',     icon: 'eye-outline' },
    { key: 'read',    label: 'Llegit',      icon: 'check-bold' },
  ];

  return (
    <View style={styles.container}>
      {options.map(opt => (
        <View key={opt.key} style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.button, selected === opt.key && styles.buttonSelected]}
            onPress={() => toggle(opt.key, selected)}
          >
            <MaterialCommunityIcons
              name={opt.icon}
              size={24}
              color={selected === opt.key ? '#fff' : '#F8794A'}
            />
          </TouchableOpacity>
          <Text style={[
            styles.label,
            selected === opt.key && { color: '#F8794A', fontWeight: 'bold' }
          ]}>
            {opt.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 16, marginVertical: 10 },
  button: {
    backgroundColor: '#FEF2ED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: { backgroundColor: '#F8794A' },
  label: {
    color: '#626262',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Raleway_400Regular',
  },
});

