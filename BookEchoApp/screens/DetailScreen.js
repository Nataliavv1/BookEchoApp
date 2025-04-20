import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

// Si no los usás, mejor eliminar estos imports:
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";
import ToggleReadState from "../components/buttons/toggleReadState";

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { titol, imatge, autors } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: titol,
      headerRight: () => (
        <Overlay style={styles.overlay}
          title="Opcions de Llibre"
          delateText="Afegeix a una llista de llibres"
          editText="Comparteix"
          contentType="EditDelate"
        />
      ),
    });
  }, [navigation, titol]);

  return (
    <View style={styles.container}>

      <Image source={{ uri: imatge }} style={styles.thumbnail} />
      <Text style={styles.title}>{titol}</Text>
      <Text style={styles.author}>
       {Array.isArray(autors) ? autors.join(', ') : autors}
      </Text>
      <View style={styles.puntuacio}>
        <Ionicons name="star" size={24} color={'#F8BD01'}></Ionicons>
        <Text>Puntuacio</Text>
      </View>

      <View style={styles.containerInfo}>
        <ToggleReadState></ToggleReadState>
        <Toggle text1={'Informació'} text2={'Ressenyes(143)'}></Toggle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#C6E5E1',
    flex: 1,
    
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  thumbnail: {
    width: '158',
    height: 237,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Urbanist_700Bold',
  },
  author: {
    fontSize: 18,
    color: '#626262',
    marginTop: 4,
    fontFamily: 'Urbanist_400Regular'
  },
  puntuacio: {
    flexDirection: 'row',
  },
  containerInfo: {
    flex:1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 150,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    alignItems: 'center',
  },
});

export default DetailScreen;

