import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importem colors, tipografia i botons
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import TextButton from '../../components/buttons/TextButton';


// Creem la navegació per poder moure'ns a les pantalles "Inici Sessió" i "Registre"
export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/*Afegim la imatge del logo*/}
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Escaneja,{'\n'}Guarda,{'\n'}Llegeix</Text>
      </View>

      {/* Esta buit perque així els botons es queden abaix */}
      <View style={{ flex: 1 }} />

      {/* Botó per navegar a la pàgina Registre */}
      <TextButton
        title="Registra't"
        variant="outline"
        onPress={() => navigation.navigate('Register')}
      />

      {/* Botó per navegar a la pàgina Log In */}
      <TextButton
        title="Inicia sessió"
        variant="filled"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.NormalTurquoise,
    paddingHorizontal: 27,
    paddingVertical: 36,
  },
  image: {
    height: 125,
    marginBottom: 125,
    marginTop: 50,
  },
  titleWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 125,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: colors.LightWhite,
    lineHeight: 80,
  },
  
});
