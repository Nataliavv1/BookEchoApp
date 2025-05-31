import { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FormInput from "../components/inputs/FormInput";
import BackButton from "../components/buttons/backbutton";
import colors from "../styles/colors";
import entrada from "../assets/entrada.png";
import Button from "../components/buttons/button";
import typography from '../styles/typography';
import exclamation from '../assets/exclamation.png';

import OverlayISBNCheck from '../components/overlays&popups/OverlayISBNCheck';

const EntradaScreen = () => {
  const navigation = useNavigation();
  const [isbn, setIsbn] = useState('');
  const overlayRef = useRef();

  // Cada vez que cambia el ISBN, si es válido, mostramos overlay automáticamente
  useEffect(() => {
    const cleanIsbn = isbn.replace(/[^0-9Xx]/g, '');
    if ((cleanIsbn.length === 10 || cleanIsbn.length === 13) && overlayRef.current) {
      overlayRef.current.show();
    }
  }, [isbn]);

  const onConfirm = (book) => {
    navigation.navigate('Entrada2', { isbn, book });
  };

  const onCancel = () => {
    navigation.navigate('Entrada2', { isbn: '', book: null });
  };

  const handleNext = () => {
    if (isbn.trim() === '') {
      alert('Introdueix un ISBN vàlid');
      return;
    }
    const cleanIsbn = isbn.replace(/[^0-9Xx]/g, '');
    if (cleanIsbn.length !== 10 && cleanIsbn.length !== 13) {
      // Si ISBN incompleto o inválido, navegamos sin overlay
      navigation.navigate('Entrada2', { isbn, book: null });
    } else {
      // Si es válido, ya se mostró el overlay automáticamente, aquí no hacemos nada o puedes forzar que muestre (opcional)
      overlayRef.current?.show();
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Image source={entrada} style={{ width: 216, height: 216 }} />
      <View style={styles.titles}>
        <Text style={[styles.title, typography.H1Bold]}>Afegeix un llibre que falta</Text>
        <Text style={[styles.subtitle, typography.H2Medium]}>Pas 1</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={[styles.text, typography.bodyBold]}>Primer cercarem per codi ISBN</Text>
        <FormInput
          value={isbn}
          onChangeText={setIsbn}
          placeholder="Introdueix el codi ISBN"
        />
        <Text style={[styles.text, typography.footerLight]}>
          Un ISBN és un número únic de 10 o 13 dígits assignat a cada edició publicada d'un llibre.
        </Text>
        <View style={styles.box}>
          <Image source={exclamation} style={{ width: 50, height: 50 }} />
          <View>
            <Text style={[styles.boxTitle, typography.subtitleMedium]}>No té ISBN? Cap problema</Text>
            <Text style={[styles.boxText, typography.labelRegular]}>Pots omplir els buits en el següent pas</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button title={'Cancel·la'} onPress={() => navigation.goBack()} />
          <Button title={'Següent'} onPress={handleNext} />
        </View>
      </View>

      {/* Overlay siempre montado, controlado por ref */}
      <OverlayISBNCheck
        ref={overlayRef}
        isbn={isbn}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.NormalTurquoise,
    gap: 24,
  },
  titles: {
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    gap: 10,
  },
  title: {
    width: "100%",
    textAlign: "left",
    color: colors.LightWhite,
  },
  subtitle: {
    width: "100%",
    color: colors.LightWhite,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.LightWhite,
    width: '100%',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 27,
    gap: 10,
    paddingLeft: 27,
    paddingRight: 27,
  },
  box: {
    backgroundColor: colors.LightOrange,
    flexDirection: "row",
    gap: 8,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
  },
  boxTitle: {
    color: colors.NormalOrange,
  },
  buttons: {
    flexDirection: "row",
    gap: 31,
  },
  text: {},
});

export default EntradaScreen;
