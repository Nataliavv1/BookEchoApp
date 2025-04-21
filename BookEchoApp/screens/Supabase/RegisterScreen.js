// ... imports (iguales)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { supabase } from './lib/supabaseClient';
import * as ImagePicker from 'expo-image-picker';
import FormInput from '../../components/inputs/FormInput';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaTypeOptions.Images], // ✅ mejor forma
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (userId, imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filePath = `avatars/${userId}_${Date.now()}.jpg`;  // Asegúrate de que el nombre de archivo sea único

    const { error: uploadError } = await supabase.storage
      .from('avatars')  // Nombre del bucket
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true,  // Para que sobrescriba si el archivo ya existe
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);  // Obtener la URL pública de la imagen

    return urlData.publicUrl;  // Retornar la URL pública para almacenarla en el perfil
  };

  const checkUniqueFields = async () => {
    const { data: usernameData, error: usernameError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (usernameData) return 'El nom d\'usuari ja està en ús';

    const { data: emailData, error: emailError } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (emailData) return 'El correu electrònic ja està en ús';

    return null;
  };

  const handleRegister = async () => {
    if (!email || !password || !username || !name || !surname) {
      Alert.alert('Error', 'Omple tots els camps');
      return;
    }

    const uniqueError = await checkUniqueFields();
    if (uniqueError) {
      Alert.alert('Error', uniqueError);
      return;
    }

    setLoading(true);

    try {
      // ✅ REGISTRO bien estructurado
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        Alert.alert('Error', signUpError.message);
        setLoading(false);
        return;
      }

      const userId = signUpData.user.id;
      let avatarUrl = null;

      if (image) {
        avatarUrl = await uploadAvatar(userId, image);  // Subir la imagen y obtener URL
      }

      // ✅ INSERT correctamente con nombres y URL de avatar
      const { error: profileError } = await supabase.from('profiles').insert([{
        id: userId,
        name: name,
        last_name: surname,
        username: username,
        email: email,
        avatar_url: avatarUrl,
      }]);

      if (profileError) {
        Alert.alert('Error al guardar el perfil', profileError.message);
        setLoading(false);
        return;
      }

      // Alertamos al usuario que debe verificar su correo
      Alert.alert('Compte creat', 'Comprova el teu correu electrònic per activar el compte.');

      // Después de mostrar la alerta, redirige al login
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error inesperat', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea el teu compte</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Selecciona una imatge</Text>
        )}
      </TouchableOpacity>

      <FormInput placeholder="Nom" value={name} onChangeText={setName} icon="user" />
      <FormInput placeholder="Cognoms" value={surname} onChangeText={setSurname} icon="user" />
      <FormInput placeholder="Nom d'usuari" value={username} onChangeText={setUsername} icon="user" />
      <FormInput placeholder="Correu electrònic" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" />
      <FormInput placeholder="Contrasenya" value={password} onChangeText={setPassword} icon="lock" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Registrar-se'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Ja tens compte? Inicia sessió</Text>
      </TouchableOpacity>
    </ScrollView>
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
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 12,
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
