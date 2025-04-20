import React, { useState } from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet, ScrollView,} from 'react-native';

//S'ha tingut que instal·lar per poder agafar la imatge
import * as ImagePicker from 'expo-image-picker';

//Component del formulari
import FormInput from '../../components/inputs/FormInput';

export default function RegisterScreen({ navigation }) {
  // Establecemos el estado para todos los campos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  // Función para manejar la selección de imagen
  const pickImage = async () => {
    // Pide permisos y abre la galería
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Guardamos la imagen seleccionada
    }
  };

  // Función para manejar el registro
  const handleRegister = () => {
    if (!name || !lastName || !username || !email || !password || !image) {
      // Validación básica para asegurarse de que todos los campos estén llenos
      alert('Por favor, completa todos los campos');
      return;
    }
    // Aquí va tu lógica de registro
    console.log('Nombre:', name, 'Apellido:', lastName, 'Usuario:', username, 'Email:', email, 'Password:', password, 'Imagen:', image);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea el teu compte</Text>

      {/* Imagen de perfil */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Selecciona una imatge</Text>
        )}
      </TouchableOpacity>

      {/* Campos del formulario */}
      <FormInput
        placeholder="Nom complet"
        value={name}
        onChangeText={setName}
        icon="user"
      />
      <FormInput
        placeholder="Cognom"
        value={lastName}
        onChangeText={setLastName}
        icon="user"
      />
      <FormInput
        placeholder="Nom d'usuari"
        value={username}
        onChangeText={setUsername}
        icon="user"
      />
      <FormInput
        placeholder="Correu electrònic"
        value={email}
        onChangeText={setEmail}
        icon="mail"
        keyboardType="email-address"
      />
      <FormInput
        placeholder="Contrasenya"
        value={password}
        onChangeText={setPassword}
        icon="lock"
        secureTextEntry={true}
      />

      {/* Botón de registrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>

      {/* Enlace para ir a login */}
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
