import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

// Importem els estils
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function FormInput({
  label = '',
  value,
  onChangeText,
  placeholder = '',
  icon = 'edit',
  secureTextEntry = false,
  keyboardType = 'default',
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.wrapper}>
      {/* Etiqueta del camp */}
      {label ? (
        <Text style={[styles.label, typography.labelMedium, { color: colors.DarkerGrey }]}>
          {label}
        </Text>
      ) : null}

      <View style={[styles.container, isFocused && styles.focusedContainer]}>
        {/* Icono a l'esquerra (només si no és contrasenya) */}
        {!isPassword && (
          <AntDesign name={icon} size={18} color={colors.NormalGrey} style={styles.icon} />
        )}

        <TextInput
          style={[
            styles.input,
            typography.labelRegular,
            { color: colors.NormalGrey, paddingRight: isPassword ? 35 : 0 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.NormalGrey}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Icono per mostrar/ocultar contrasenya */}
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Entypo
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={18}
              color={colors.NormalGrey}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.LightWhite,
    borderWidth: 1,
    borderColor: colors.NormalOrange,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  focusedContainer: {
    borderColor: colors.NormalHoverOrange,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    outlineStyle: 'none',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,

  },
});