import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ButtonReadState({ style }) {
  const [saved, setSaved] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Definir colores según estado
  const backgroundColor = pressed ? '#DF6D43' : '#F8794A';
  const iconColor = pressed ? '#DF6D43' : '#FFFFFF';

  return (
    <TouchableOpacity
      style={[styles.buttonReadState, { backgroundColor }, style]}
      onPress={() => setSaved(!saved)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={1} // para que no cambie el opacity por defecto
    >
      <FontAwesome
        name={saved ? 'bookmark' : 'bookmark-o'}
        size={24}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonReadState: {
    width: 32,
    height: 32,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
