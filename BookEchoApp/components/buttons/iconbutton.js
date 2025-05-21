import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton({ onPress, color, icon, library = 'AntDesign' }) {
  const renderIcon = () => {
    if (library === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={icon} size={24} color={color} />;
    } else {
      return <AntDesign name={icon} size={24} color={color} />;
    }
  };

  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      {renderIcon()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});
