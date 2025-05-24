import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { supabase } from './lib/supabaseClient'; // Asegúrate que este archivo esté bien configurado
import FormInput from '../../components/inputs/FormInput';
import TextButton from '../../components/buttons/TextButton';

import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage.from('avatars').list('', {
        limit: 100,
        offset: 0,
      });

      if (error) {
        console.error('Error al obtener imágenes:', error.message);
      } else {
        const urls = await Promise.all(
          data.map(async (file) => {
            const { data: publicUrl } = supabase.storage
              .from('avatars')
              .getPublicUrl(file.name);
            return {
              name: file.name,
              url: publicUrl.publicUrl,
            };
          })
        );
        setAvatars(urls);
      }
    };

    fetchAvatars();
  }, []);

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

    if (!selectedAvatar) {
      Alert.alert('Error', 'Has de seleccionar un avatar');
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

      const userId = signUpData.user?.id;
      console.log("User ID:", userId);

      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: userId,
          name: name,
          last_name: surname,
          username: username,
          email: email,
          avatar_url: selectedAvatar,
        },
      ]);

      if (profileError) {
        console.log('Profile insert error:', profileError);
        Alert.alert('Error al guardar el perfil', profileError.message);
        setLoading(false);
        return;
      }

      /*CODI NURIA: Per afegir les llistes predeterminades al registrarse*/
        const { error: llistesError } = await supabase.from('llista').insert([
      { nom: 'Per llegir', usuari_id: userId },
      { nom: 'Llegint', usuari_id: userId },
      { nom: 'Llegit', usuari_id: userId },
    ]);

    if (llistesError) {
      Alert.alert('Error al crear les llistes predeterminades', llistesError.message);
      setLoading(false);
      return;
    }
       /*CODI NURIA */

      Alert.alert(
        'Compte creat',
        'Comprova el teu correu electrònic per activar el compte.'
      );
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

        <View style={{ marginBottom: 20 }}>
          <Text style={[typography.labelRegular, { marginBottom: 10 }]}>
            Selecciona un avatar:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((avatar) => (
              <TouchableOpacity
                key={avatar.name}
                onPress={() => setSelectedAvatar(avatar.url)}
                style={[
                  styles.avatarImageWrapper,
                  selectedAvatar === avatar.url && styles.avatarSelected,
                ]}
              >
                <Image source={{ uri: avatar.url }} style={styles.avatarImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

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
            <Text style={[typography.labelRegular, styles.link1]}>Ja tens compte? </Text>
            <Text style={[typography.labelBold, styles.link2]}>Inicia sessió</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
  avatarImageWrapper: {
    marginRight: 10,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    width: 60,
    height: 60,
  },
  avatarSelected: {
    borderColor: colors.NormalOrange,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    alignItems: 'center',
    marginTop: 15,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  link1: {
    color: colors.DarkerGrey,
  },
  link2: {
    color: colors.NormalTurquoise,
  },
});
