import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Importem Supabase
import { supabase } from './lib/supabaseClient';

// Component del formulari
import FormInput from '../../components/inputs/FormInput';
import TextButton from '../../components/buttons/TextButton';

// Importem colors, tipografia i botons
import colors from '../../styles/colors';
import typography from '../../styles/typography';

import { useUser } from '../../context/UserContext'; // ✅ Importem el context
import { useLlistes } from '../../context/LlistesContext'; // ✅ Importem el context de llistes
import { fetchLlistesPredet } from '../../Model/FetchLlistes';
// Importem la funcio per agafar les llistes predeterminades que volem guardar al context.

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUserProfile } = useUser(); // ✅ Accés al context
  const { setLlistesPredet } = useLlistes(); // ✅ Accés al context de llistes

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Omple tots els camps');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
        setLoading(false);
        return;
      }

      // Verifiquem si el correu està confirmat
      if (!data.user.email_confirmed_at) {
        Alert.alert(
          'Error',
          'Per poder iniciar sessió, has de confirmar el teu correu electrònic.'
        );
        setLoading(false);
        return;
      }

      // Obtenim el perfil de l'usuari
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profileData) {
        Alert.alert('Error', 'No s\'han pogut carregar les dades del perfil.');
        setLoading(false);
        return;
      }

      // ✅ Guardem el perfil al context
      setUserProfile(profileData);

      //Fem la funció de fetch llistes per obtenir les llistes predeterminades
      const llistes = await fetchLlistesPredet(profileData);
      //Guardem les llistes al context
      if (llistes) {
        setLlistesPredet(llistes);
         console.log('Contexto actualizado con llistes:', llistes);
      }

      navigation.replace('Tabs');
    } catch (error) {
      Alert.alert('Error', 'Ha ocorregut un error inesperat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.logoWrapper}>
        <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.inicialText}>
        <Text style={[styles.text1, typography.H1SemiBold]}>Hola de nou!</Text>
        <Text style={[styles.text2, typography.H3Regular]}>T’hem trobat a faltar.</Text>
      </View>

      <View style={styles.loginBox}>
        <Text style={[styles.title, typography.H2SemiBold]}>Inicia sessió</Text>

        <FormInput
          label="Correu electrònic:"
          placeholder="Correu electrònic"
          value={email}
          onChangeText={setEmail}
          icon="mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput
          label="Contrasenya:"
          placeholder="Contrasenya"
          value={password}
          onChangeText={setPassword}
          icon="lock"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <TextButton
            title={loading ? 'Carregant...' : 'Entrar'}
            onPress={handleLogin}
            variant="filledTurquoise"
            style={{ width: '50%' }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            <Text style={[typography.labelRegular, styles.link1]}>Encara no tens compte? </Text>
            <Text style={[typography.labelBold, styles.link2]}>Registra't</Text>
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
    flexGrow: 1,
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
  loginBox: {
    backgroundColor: colors.NormalWhite,
    paddingHorizontal: 27,
    paddingVertical: 45,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    color: colors.DarkerGrey,
    marginBottom: 25,
    textAlign: 'center',
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
