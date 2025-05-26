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

import { supabase } from './lib/supabaseClient';
import FormInput from '../../components/inputs/FormInput';
import TextButton from '../../components/buttons/TextButton';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

import { useUser } from '../../context/UserContext'; // 👈 Importar contexto de usuario

export default function RegisterScreen({ navigation }) {
  // Estados de campos del formulario
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para avatares
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { setUserProfile } = useUser(); // 👈 Función del contexto para guardar perfil

  // Obtener avatares del bucket de Supabase
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

  // Comprobar si el usuario o email ya existen
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

  // Función principal de registro
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
      // Crear usuario con auth
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

      // Insertar datos en tabla de perfiles
      const { error: profileError } = await supabase.from('profiles').insert([{
        id: userId,
        name: name,
        last_name: surname,
        username: username,
        email: email,
        avatar_url: selectedAvatar,
      }]);

      if (profileError) {
        Alert.alert('Error al guardar el perfil', profileError.message);
        setLoading(false);
        return;
      }

      // Crear listas por defecto
      await supabase.from('llista').insert([
        { nom: 'Per llegir', usuari_id: userId, es_predeterminada: true, tipus_predeterminat: 'Per llegir', image: 'https://bizqtmcljmduxrqwmdsh.supabase.co/storage/v1/object/public/llistes//perLlegir.png' },
        { nom: 'Llegint', usuari_id: userId, es_predeterminada: true, tipus_predeterminat: 'Llegint', image: 'https://bizqtmcljmduxrqwmdsh.supabase.co/storage/v1/object/public/llistes//llegint.png' },
        { nom: 'Llegit', usuari_id: userId, es_predeterminada: true, tipus_predeterminat: 'Llegit', image: 'https://bizqtmcljmduxrqwmdsh.supabase.co/storage/v1/object/public/llistes//llegit.png' },
      ]);

      // ✅ GUARDAR PERFIL EN CONTEXTO
      setUserProfile({
        id: userId,
        name,
        surname,
        username,
        email,
        avatar_url: selectedAvatar,
      });

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
      {/* UI de encabezado */}
      <View style={styles.logoWrapper}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inicialText}>
        <Text style={[styles.text1, typography.H1SemiBold]}>Hola!</Text>
        <Text style={[styles.text2, typography.H3Regular]}>Benvingut/da a BookEcho</Text>
      </View>

      {/* Formulario */}
      <View style={styles.RegisterBox}>
        <Text style={[styles.title, typography.H2SemiBold]}>Registre</Text>

        {/* Selector de avatares */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[typography.labelRegular, { marginBottom: 10 }]}>Selecciona un avatar:</Text>
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

        {/* Inputs */}
        <FormInput label="Nom:" placeholder="Nom" value={name} onChangeText={setName} icon="user" />
        <FormInput label="Cognoms:" placeholder="Cognoms" value={surname} onChangeText={setSurname} icon="user" />
        <FormInput label="Nom d'usuari:" placeholder="Nom d'usuari" value={username} onChangeText={setUsername} icon="book" />
        <FormInput label="Correu electrònic:" placeholder="Correu electrònic" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" autoCapitalize="none" />
        <FormInput label="Contrasenya:" placeholder="Contrasenya" value={password} onChangeText={setPassword} icon="lock" secureTextEntry />

        {/* Botón de registro */}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <TextButton
            title={loading ? 'Carregant...' : 'Registrar-se'}
            onPress={handleRegister}
            variant="filledTurquoise"
            style={{ width: '50%' }}
          />
        </TouchableOpacity>

        {/* Link a login */}
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
