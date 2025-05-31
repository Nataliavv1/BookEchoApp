import React, { useState, useEffect } from 'react';
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
import colors from '../styles/colors';
import typography from '../styles/typography';

import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// Importamos el contexto de usuario para acceder al perfil
import { useUser } from '../context/UserContext';

import { Modal } from 'react-native-web';

import SharePopup from '../components/overlays&popups/contentForOverlay/SharePopup';
import ActiveChallengesSection from '../components/challenges/ActiveChallengesSection';
import { fetchReviewsByUser } from '../Model/ReviewModel';
import GoogleBooksList from './GoogleBooksList';


export default function ProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, setUserProfile } = useUser(); // Obtenim les dades del perfil des del context
  const [shareVisible, setShareVisible] = useState(false);
  const [bookIds, setBookIds] = useState();

  const handleEditPhoto = () => { // TODO mirar si això ja no fa res
    navigation.navigate('EditPhotoScreen');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
    
  };

  const [showSettings, setShowSettings] = useState(false);

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);  

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage.from('avatars').list('', {
        limit: 100,
        offset: 0,
      });

      if (error) {
        console.error('Error al obtenir imatges:', error.message);
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

    const fetchReviews = async () => {
      const reviews = await fetchReviewsByUser(userProfile.id);
      setBookIds(reviews.map(r => r.book_id));
    }

    fetchAvatars();
    fetchReviews();
  }, []);


  const handleLogoutModalViewState = () => { 
    setShowSettings(false);
    setShowLogoutModal(true);
    console.log('logout clicked');
  }
  const handleDeleteModalViewState = () => { 
    setShowSettings(false);
    setShowDeleteModal(true);
    console.log('delete clicked');
  }
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Funció per tancar sessió:
  const handleLogout = async () => {
  await supabase.auth.signOut();
  setUserProfile(null);
  navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  console.log ('has clickat logout');
  };

  // Funció per eliminar la info de la base de dades:
  const handleDeleteAccount = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      console.error('Error obtenint usuari:', error?.message);
      return;
    }

    // Eliminar perfil de la base de dades
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (deleteError) {
      console.error('Error eliminant perfil:', deleteError.message);
      return;
    }

    // Tancar sessió després d'eliminar
    await supabase.auth.signOut();
    setUserProfile(null);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleUpdateAvatar = async (url) => { // TODO mirar si això ja no fa res
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('No s\'ha pogut obtenir l\'usuari:', userError?.message);
      console.log('no es pot accedir a l\'usuari');
      return;
    }

    // 🔄 Actualitza l'avatar a la base de dades
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: selectedAvatar, })
      .eq('id', user.id);
      console.log(selectedAvatar);

    if (updateError) {
      console.error('Error actualitzant avatar:', updateError.message);
      console.log('error al canviar avatar');
      return;
    }

    // ✅ Torna a obtenir el perfil actualitzat
    const { data: updatedProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      console.log('avatar canviat!');

    if (fetchError) {
      console.error('Error refrescant perfil:', fetchError.message);
      return;
    }

    // 🧠 Actualitza el context amb el nou perfil
    setUserProfile(updatedProfile);

    // ✅ Opcional: tancar el popup
    setSelectedAvatar(url);
    setShowSettings(false);
  };

 
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
          {bookIds && <GoogleBooksList bookIds={bookIds} style={styles.listOverlay} detailsPreselectedOption='option2' query='fakeQuery'/>}
        </View>

        <View style={styles.section}>
          <ActiveChallengesSection />{/* TODO no funciona? */}
          <Text style={styles.sectionTitle}>Els meus reptes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
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
              {/*}
              <View style={styles.avatarSelection}>
                <Text style={styles.sectionTitle}>Tria un nou avatar</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {avatars.map((avatar) => (
                    <TouchableOpacity
                      key={avatar.name}
                      onPress={() => handleUpdateAvatar(avatar.url)}
                    >
                      <Image
                        source={{ uri: avatar.url }}
                        style={[
                          styles.avatarOption,
                          selectedAvatar === avatar.url && styles.selectedAvatar,
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              */}

              {/*  
              <TouchableOpacity >
                <Text style={styles.option}>📷 Edita la foto de perfil</Text>
              </TouchableOpacity>
              */}
              <TouchableOpacity onPress={handleEditProfile}>
                {/*<AntDesign type="share-alt" />
                <AntDesign name="share-alt" size={24} color="#000" />*/}
                <Text style={styles.option}>✏️ Edita el meu perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShareVisible(true)}>
                <Text style={styles.option}>🔗 Comparteix el meu perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLogoutModalViewState()}>
                <Text style={styles.option}>🔒 Tanca la sessió</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteModalViewState()}>
                <Text style={[styles.option, styles.danger]}>🗑️ Elimina totes les dades</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 🔒 Modal de confirmació de logout */}
        {/*<Modal visible={showLogoutModal} transparent animationType="fade">*/}
          {showLogoutModal && (
            <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backdrop}
              onPress={() => setShowLogoutModal(false)}
            />
            <View style={styles.modalBox}>
              <Text style={[styles.modalTitle, typography.H2SemiBold]}>Tancar sessió</Text>
              <Text style={styles.modalText}>Segur que vols tancar la sessió?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowLogoutModal(false)}>
                  <Text style={styles.cancelButton}>Cancel·lar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLogout()}>
                  <Text style={styles.confirmButton}>Tancar sessió</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>)}
        {/*</Modal>*/}

        {/* 🗑️ Modal de confirmació d’eliminació */}
        {/*<Modal visible={showDeleteModal} transparent animationType="fade">*/}
        {showDeleteModal && (
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.backdrop}
              onPress={() => setShowDeleteModal(false)}
            />
            <View style={styles.modalBox}>
              <Text style={[styles.modalTitle, typography.H2SemiBold]}>Eliminar compte</Text>
              <Text style={styles.modalText}>Aquesta acció és permanent. Segur que vols eliminar totes les teves dades?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.cancelButton}>Cancel·lar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteAccount()}>
                  <Text style={styles.confirmButton}>Si, eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>)}
        {/*</Modal>*/}

        <SharePopup visible={shareVisible} onCancel={() => setShareVisible(false)} />

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
  avatarSelection: {
  marginVertical: 10,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedAvatar: {
    borderColor: '#47AC9E',
    borderWidth: 3,
  },

  //estils dels modals
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.NormalTurquoise,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#193C37',
  },
  modalText: {
    fontSize: 14,
    color: '#626262',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    color:'#ffffff',
    backgroundColor: '#f8794a',
    borderWidth: 1,
    borderColor: '#f8794a',
    borderRadius: 5, 
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  confirmButton: {
    color:'#3B3B3B',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3B3B3B',
    borderRadius: 5, 
    paddingVertical: 12,
    paddingHorizontal: 24,
  },


});
