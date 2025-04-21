import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

// Importem Supabase
import { supabase } from './lib/supabaseClient';

// Component del formulari
import FormInput from '../../components/inputs/FormInput';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Manejador de inicio de sesión
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Omple tots els camps');
      return;
    }

    setLoading(true); // Empieza el loading

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false); // Termina el loading

      if (error) {
        Alert.alert('Error', error.message); // Muestra el error si existe
        return;
      }

      // Verificar si el correo está confirmado
      if (!data.user.email_confirmed_at) {
        Alert.alert('Error', 'Per poder iniciar sessió, has de confirmar el teu correu electrònic.');
        return;
      }

      navigation.replace('Tabs'); // Si el login es exitoso, navega a las tabs
    } catch (error) {
      setLoading(false); // Termina el loading en caso de error
      Alert.alert('Error', 'Ha ocorregut un error inesperat'); // Error general
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sessió</Text>

      <FormInput
        placeholder="Correu electrònic"
        value={email}
        onChangeText={setEmail}
        icon="mail"
      />
      <FormInput
        placeholder="Contrasenya"
        value={password}
        onChangeText={setPassword}
        icon="lock"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <Text style={styles.buttonText}>Cargando...</Text>
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Encara no tens compte? Registra't</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#358177',
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#47AC9E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#47AC9E',
    marginTop: 20,
    textAlign: 'center',
  },
});
