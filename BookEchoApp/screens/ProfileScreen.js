import React, { useState } from 'react';
import {supabase} from './Supabase/lib/supabaseClient';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import BackButton from '../components/buttons/backbutton';
import IconButton from '../components/buttons/iconbutton';
import Button from '../components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// Importamos el contexto de usuario para acceder al perfil
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userProfile } = useUser(); // Obtenim les dades del perfil des del context

  const handleEditPhoto = () => {
    navigation.navigate('EditPhotoScreen');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const handleShare = () => {
    navigation.navigate('SharePopup');
  };

  const [showSettings, setShowSettings] = useState(false);

  // Aquest codi s'ha substituït per l'ús del context useUser
  /*
  const [userName, setUserName] = useState('');

  useEffect(() => {
      const fetchUserName = async () => {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError || !user) {
          console.log('Error obtenint usuari:', userError);
          return;
          }

          const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();

          if (error) {
          console.log('Error obtenint perfil:', error.message);
          } else {
          setUserName(data.name);
          }
      };

      fetchUserName();
  }, []);
  */

  return (
    <View style={styles.container}>
      <BackButton />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.profileHeaderSettings} onPress={() => setShowSettings(true)}>
            <AntDesign name="setting" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Mostrem l'avatar de l'usuari si existeix, sinó un per defecte */}
          {userProfile?.avatar_url ? (
            <Image source={{ uri: userProfile.avatar_url }} style={styles.avatar} />
          ) : (
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
          )}

          {/* Mostrem el nom d'usuari si està disponible */}
          <Text style={styles.username}>
            {userProfile?.username || 'Nom Usuari'}
          </Text>

          <IconButton onPress={() => console.log('Open settings')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Les meves ressenyes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              //source={require('../assets/lectorSocial.png')}
              style={styles.bookThumbnail}
            />
            {/* Afegeix més imatges si cal */}
          </ScrollView>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>Veure més</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Els meus reptes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Image
              //source={require('../assets/lectorSocial.png')}
              style={styles.trophyIcon}
            />
            {/* Afegeix més trofeus si cal */}
          </ScrollView>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>Veure més</Text>
          </TouchableOpacity>
        </View>

        {showSettings && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.backdrop}
              onPress={() => setShowSettings(false)}
            />
            <View style={styles.settingsCard}>
              <TouchableOpacity onPress={handleEditPhoto}>
                <Text style={styles.option}>📷 Edita la foto de perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEditProfile}>
                <Text style={styles.option}>✏️ Edita el meu perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleShare}>
                <Text style={styles.option}>🔗 Comparteix el meu perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.option}>🚪 Tanca la sessió</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.option, styles.danger]}>
                  🗑️ Elimina totes les dades
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    borderColor:'#47AC9E',
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor:'#47AC9E',
    minWidth: 300,
    maxWidth: 510,
  },
  profileHeaderSettings:{
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#47AC9E',
    marginBottom: 10,
    marginTop:10,
  },
  username: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#358177',
  },
  bookThumbnail: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  trophyIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  seeMoreText: {
    color: '#47AC9E',
    fontWeight: '600',
    marginTop: 8,
  },
  settingsCard: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 10,
  },
  option: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  danger: {
    color: '#D64545',
    fontWeight: 'bold',
  },
  modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  settingsCard: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 10,
    zIndex: 101,
    width: '85%',
  },

});
