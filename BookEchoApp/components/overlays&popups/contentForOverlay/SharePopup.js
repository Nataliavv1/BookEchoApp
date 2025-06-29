import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Linking } from 'react-native';
import Button from '../../buttons/button';
import typography from '../../../styles/typography';

/*const friends = [
// En un futur afegir la llista d'amics dins l'app per compartir llibres en un xat
  { id: 1, name: 'Amic 1', icon: require('../../../assets/images/SharePopupIcons/friendicon.png') },
  { id: 2, name: 'Amic 2', icon: require('../../../assets/images/SharePopupIcons/friendicon.png') },
  { id: 3, name: 'Amic 3', icon: require('../../../assets/images/SharePopupIcons/friendicon.png') },
  { id: 4, name: 'Amic 4', icon: require('../../../assets/images/SharePopupIcons/friendicon.png') },
];*/

const platforms = [
  { name: 'WhatsApp', icon: require('../../../assets/images/SharePopupIcons/whatsapplogo.png') },
  { name: 'Telegram', icon: require('../../../assets/images/SharePopupIcons/telegramlogo.png') },
  { name: 'Instagram', icon: require('../../../assets/images/SharePopupIcons/instagramlogo.png') },
  { name: 'Twitch', icon: require('../../../assets/images/SharePopupIcons/twitchlogo.png') },
];

export default function SharePopup({ visible, onCancel }) {
    const handleShare = async (platform) => {
      let appUrl = '';
      let webFallbackUrl = '';
      // Segons l'aplicació escollida , es determina la URL per compartir
      switch (platform) {
        case 'WhatsApp':
          appUrl = 'whatsapp://send?text=Hola! Mira aquesta app BookEcho!';
          webFallbackUrl = 'https://wa.me/?text=Hola! Mira aquesta app BookEcho!';
          break;
        case 'Telegram':
          appUrl = 'tg://msg?text=Hola! Mira aquesta app BookEcho!';
          webFallbackUrl = 'https://t.me/share/url?url=https://bookechoapp.example&text=Hola! Mira aquesta app BookEcho!';
          break;
        case 'Instagram':
          appUrl = 'instagram://user?username=bookechoapp';
          webFallbackUrl = 'https://www.instagram.com/bookechoapp';
          break;
        case 'Twitter':
          appUrl = 'twitter://post?message=Hola! Mira aquesta app BookEcho!';
          webFallbackUrl = 'https://twitter.com/intent/tweet?text=Hola! Mira aquesta app BookEcho!';
          break;
        default:
          return;
      }
      
      // Per obrir els links o enviar un missatge d'error
      try {
        const supported = await Linking.canOpenURL(appUrl);
        if (supported) {
          await Linking.openURL(appUrl);
        } else {
          await Linking.openURL(webFallbackUrl);
        }
      } catch (error) {
        console.error('Error obrint l\'app:', error);
        alert('No s\'ha pogut obrir la plataforma seleccionada.');
      }
    };
    //const handleOnCancel = () => setShareVisible(false);
  
    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}  statusBarTranslucent>
        {/* Mostra el contingut del modal */}
        <View style={styles.modalContainer}>
          <BlurView style={styles.blurBackground} intensity={100} tint="dark" />
          <TouchableOpacity
          style={styles.closeButton}// Intents per fer que al clickar fora del contingut del modal es tanqui (no funciona)
            //onPress={console.log('close share popup')}
            //onPress={() => onCancel()}
            //onPress={setShareVisible(false)}
            //onPress={handleOnCancel()}
            //onPress={onCancel}
          />
  
          <View style={styles.modalContent}>
            <Text style={[styles.title, typography.H2SemiBold]}>Comparteix</Text>
            
            {/*
            <View style={styles.friendRow}>
              {friends.map(friend => (
                <View key={friend.id} style={styles.friendItem}>
                  <Image source={friend.icon} style={styles.friendIcon} />
                  <Text style={styles.friendText}>{friend.name}</Text>
                </View>
              ))}
            </View>
  
          <View style={styles.separator} />*/}

            <View style={styles.platformRow}>
              {platforms.map(platform => (
                <TouchableOpacity
                  key={platform.name}
                  style={styles.platformItem}
                  onPress={() => handleShare(platform.name)}
                >
                  <Image source={platform.icon} style={styles.platformIcon} />
                  <Text style={styles.platformText}>{platform.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelButton}>Cancel·lar</Text>
              </TouchableOpacity>
              {/*<Button title="Cancel·lar" onPress={onCancel} color={'#f8794a'} fontcolor={'#ffffff'} />*/}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    blurBackground: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(34,34,34,0.4)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '85%',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#193C37',
    },
    friendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    friendItem: {
      alignItems: 'center',
      marginHorizontal: 5,
    },
    friendIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    friendText: {
      fontSize: 12,
      marginTop: 4,
      color: '#626262',
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: '#DDD',
      marginVertical: 20,
    },
    platformRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
    },
    platformItem: {
      alignItems: 'center',
    },
    platformIcon: {
      width: 50,
      height: 50,
    },
    platformText: {
      fontSize: 14,
      marginTop: 4,
      color: '#626262',
    },
    buttonContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    cancelButton: {
      fontSize: 16,
      color:'#ffffff',
      backgroundColor: '#f8794a',
      borderWidth: 1,
      borderColor: '#f8794a',
      borderRadius: 5, 
      paddingVertical: 12,
      paddingHorizontal: 30,
    },
  });