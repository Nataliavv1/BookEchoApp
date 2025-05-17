// ...imports
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
import TextButton from '../../components/buttons/TextButton';

// Importem colors, tipografia i botons
import colors from '../../styles/colors';
import typography from '../../styles/typography';

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
      mediaTypes: [ImagePicker.MediaTypeOptions.Images],
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
    const filePath = `avatars/${userId}_${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const checkUniqueFields = async () => {
    const { data: usernameData } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (usernameData) return 'El nom d\'usuari ja està en ús';

    const { data: emailData } = await supabase
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
        avatarUrl = await uploadAvatar(userId, image);
      }

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

      Alert.alert('Compte creat', 'Comprova el teu correu electrònic per activar el compte.');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error inesperat', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.logoWrapper}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.inicialText}>
        <Text style={[styles.text1, typography.H1SemiBold]}>Hola!</Text>
        <Text style={[styles.text2, typography.H3Regular]}>Benvingut/da a BookEcho</Text>
      </View>

      <View style={styles.RegisterBox}>
        <Text style={[styles.title, typography.H2SemiBold]}>Registre</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Selecciona una imatge</Text>
          )}
        </TouchableOpacity>

        <FormInput label="Nom:" placeholder="Nom" value={name} onChangeText={setName} icon="user" />
        <FormInput label="Cognoms:" placeholder="Cognoms" value={surname} onChangeText={setSurname} icon="user" />
        <FormInput label="Nom d'usuari:" placeholder="Nom d'usuari" value={username} onChangeText={setUsername} icon="book" />
        <FormInput label="Correu electrònic:" placeholder="Correu electrònic" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" autoCapitalize="none" />
        <FormInput label="Contrasenya:" placeholder="Contrasenya" value={password} onChangeText={setPassword} icon="lock" secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <TextButton
            title={loading ? 'Carregant...' : 'Registrar-se'}
            onPress={handleRegister}
            variant="filledTurquoise"
            style={{ width: '50%' }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            <Text style={[typography.labelRegular,styles.link1]}>Ja tens compte? </Text>
            <Text style={[typography.labelBold,styles.link2]}>Inicia sessió</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.NormalTurquoise,
  },
  logoWrapper: {
    alignItems: 'flex-end',
    marginBottom: 40,
    paddingHorizontal: 27,
    paddingTop: 36,
  },
  logo: {
    width: 72,
    resizeMode: 'contain',
  },
  inicialText: {
    paddingHorizontal: 27,
    marginBottom: 30,
  },
  text1: {
    color: colors.NormalWhite,
    textAlign: 'left',
    marginBottom: 10,
  },
  text2: {
    color: colors.NormalWhite,
    textAlign: 'left',
    marginBottom: 40,
  },

  //Part Box
  RegisterBox: {
    backgroundColor: colors.NormalWhite,
    paddingHorizontal: 27,
    paddingVertical: 45,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    color: colors.DarkerGrey,
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
    borderColor: colors.NormalOrange,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: colors.NormalOrange,
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  link1:{
    color: colors.DarkerGrey,
  },
  link2:{
    color: colors.NormalTurquoise,
  },
});
