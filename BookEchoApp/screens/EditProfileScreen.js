import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {supabase} from './Supabase/lib/supabaseClient';
import FormInput from '../components/inputs/FormInput';
import TextButton from '../components/buttons/TextButton';
import { useUser } from '../context/UserContext';
import colors from '../styles/colors';
import typography from '../styles/typography';

export default function EditProfileScreen({ navigation }) {
  const { userProfile, setUserProfile } = useUser();

  const [name, setName] = useState(userProfile?.name || '');
  const [surname, setSurname] = useState(userProfile?.surname || '');
  const [username, setUsername] = useState(userProfile?.username || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar_url || '');
  const [loading, setLoading] = useState(false);

  // Carrega avatars
  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage.from('avatars').list('', {
        limit: 100,
        offset: 0,
      });

      if (error) {
        console.error('Error carregant avatars:', error.message);
        return;
      }

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
    };

    fetchAvatars();
  }, []);

  const handleSave = async () => {
    if (!name || !surname || !username || !email) {
      Alert.alert('Error', 'Omple tots els camps');
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        name,
        last_name: surname,
        username,
        email,
        avatar_url: selectedAvatar,
      })
      .eq('id', userProfile.id);

    if (error) {
      Alert.alert('Error actualitzant el perfil', error.message);
    } else {
      setUserProfile({
        ...userProfile,
        name,
        surname,
        username,
        email,
        avatar_url: selectedAvatar,
      });
      Alert.alert('Perfil actualitzat');
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={[typography.H2SemiBold, styles.title]}>Edita el teu perfil</Text>

        <Text style={[styles.paragraph, typography.subtitleMedium]}>Pots canviar una o més dades del teu perfil. Enrecorda't de guardar quan acabis!</Text>

        {/* Avatars */}
        <View style={{ marginBottom: 20, marginTop: 20 }}>
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
        {/*<FormInput label="Correu electrònic:" placeholder="Correu electrònic" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" autoCapitalize="none" />*/}

        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            <TextButton
            title={loading ? 'Guardant...' : 'Guardar canvis'}
            onPress={handleSave}
            variant="filledTurquoise"
            />
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.NormalWhite,
  },
  title: {
    color: colors.DarkerGrey,
    textAlign: 'center',
    marginBottom: 25,
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
    marginTop: 20,
  },
});
