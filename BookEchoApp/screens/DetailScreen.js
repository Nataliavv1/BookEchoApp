
import React, { useState, useLayoutEffect } from "react";

import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";



// Si no los usás, mejor eliminar estos imports:
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";
import ToggleReadState from "../components/buttons/toggleReadState";
import Rates from "../components/detailScreenComp/rates";
import { ScrollView } from "react-native";
// Importem colors, tipografia i botons
import colors from '../styles/colors';
import typography from '../styles/typography';
import BackButton from "../components/buttons/backbutton";

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { titol, imatge, autors } = route.params;
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <BackButton ></BackButton>
        <Text style={typography.subtitleLight} >{titol} </Text>
        <Overlay style={[styles.overlay, typography.subtitleRegular]}
          title="Opcions de Llibre"
          delateText="Afegeix a una llista de llibres"
          editText="Comparteix"
          contentType="EditDelate"
        />
      </View>

      <View style={styles.mainInfo}>
        <Image source={{ uri: imatge }} style={styles.thumbnail} />
        <Text style={styles.title}>{titol}</Text>
        <Text style={styles.author}>
          {Array.isArray(autors) ? autors.join(', ') : autors}
        </Text>
        <View style={styles.puntuacio}>
          <Ionicons name="star" size={24} color={'#F8BD01'}></Ionicons>
          <Text >Puntuacio</Text>
        </View>
      </View>


      <View style={styles.containerInfo}>
        <ToggleReadState></ToggleReadState>
        <Toggle text1={'Informació'} text2={'Ressenyes(143)'} selected={selectedOption} onChange={setSelectedOption}></Toggle>

        <View style={styles.dynamicContainer}>
          {selectedOption === "option1" && (
            <View style={[styles.content1, { color: colors.DarkerTurquoise}]}>
              <Text style={typography.H3Bold}>Descripció</Text>
              <Text style={typography.H3Bold}>Gèneres</Text>
              <Text style={typography.H3Bold}>Número ISBN</Text>
              <Text style={typography.H3Bold}>Similars</Text>
            </View>
          )}
          {selectedOption === "option2" && (
            <View>
              <Text>Puntuacions</Text>
              <Rates rate={3.6} users={123} distribution={[5, 20, 30, 40, 28]} />
              <Text>Ressenyes d'altres usuaris</Text>
            </View>
          )}
          {/* Si el boton 1 de presiona abrir contenido1
  Si el boton 2 se presiona abrir contenido2*/}



        </View>


      </View>



    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#C6E5E1',
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 26,
    gap: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mainInfo: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    width: 158,
    height: 237,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 5,
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
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
  },
});

export default DetailScreen;

