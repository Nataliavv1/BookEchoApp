import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FormInput from "../components/inputs/FormInput";
import BackButton from "../components/buttons/backbutton";
import colors from "../styles/colors";
import Button from "../components/buttons/button";
import typography from "../styles/typography";
import AutoComplete from "../components/inputs/AutoComplete";
import uploadCover from "../assets/images/uploadCover.png";
import CategoryInput from "../components/inputs/CategoryInput";
import {SaveBook, BookToList} from "../Model/BookTableModel";

const HEADER_HEIGHT = 112;

const EntradaScreen2 = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtenir paràmetres
    const { isbn, book } = route.params || {};

    // Estats inicials
    const [titol, setTitol] = useState(book?.title || "");
    const [autors, setAutors] = useState(
        Array.isArray(book?.authors) ? book.authors : []
    );
    const [descripcio, setDescripcio] = useState(book?.description || "");
    const [isbnData, setIsbn] = useState(isbn || "");

const handleNext = async () => {
  if (titol.trim() === "" || autors.length === 0) {
    Alert.alert("Atenció", "Omple com a mínim el títol i l'autor");
    return;
  }

  // Construir l'objecte llibre a guardar
  const bookToSave = {
    id: isbnData, // o un altre id que vulguis utilitzar, aquí poso ISBN
    isbn: isbnData,
    titol,
    autors,
    descripcio,
    imatge: book?.image || null,
    categories: [], // Si tens categories des de CategoryInput, agafa-les aquí (has d'afegir un estat)
    puntuaciogoogle: null,
    npuntuaciogoogle: null,
    puntuaciomitjana: null,
    npuntuaciomitjana: null,
  };

  try {
    // Guardar llibre
    const savedBook = await SaveBook(bookToSave);
    if (!savedBook) {
      Alert.alert("Error", "No s'ha pogut guardar el llibre.");
      return;
    }

    // Afegir a la llista id=31
    const addedToList = await BookToList(31, isbnData);
    if (!addedToList) {
      Alert.alert("Error", "No s'ha pogut afegir el llibre a la llista.");
      return;
    }

    // Navegar a la següent pantalla
    navigation.navigate("EntradaScreen3", {
      titol,
      autors,
      descripcio,
      isbn: isbnData,
    });
  } catch (error) {
    console.error("Error en guardar o afegir llibre:", error);
    Alert.alert("Error", "S'ha produït un error inesperat.");
  }
};


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <BackButton />
            </View>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.titles}>
                    <Text style={[styles.title, typography.H1Bold]}>
                        Afegeix un llibre que falta
                    </Text>
                    <Text style={[styles.subtitle, typography.H2Medium]}>Pas 2</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={[styles.text, typography.labelMedium]}>
                        Portada del llibre
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                        <TouchableOpacity
                        /* Aquí pots posar la funció per carregar la imatge */
                        >
                            <Image
                                source={
                                    book?.image
                                        ? { uri: book.image }
                                        : uploadCover
                                }
                                style={{ width: 96, height: 144 }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <Text>Carrega la imatge de la portada</Text>
                    </View>

                    <FormInput
                        label="Títol"
                        placeholder="Introdueix el títol del llibre"
                        value={titol}
                        onChangeText={setTitol}
                        secureTextEntry={false}
                        icon={false}
                    />

                    <Text style={[styles.text, typography.labelMedium]}>Autors</Text>
                    <AutoComplete
                        initialAuthors={autors}
                        onAuthorsChange={setAutors}
                    />


                    <FormInput
                        label="Descripció"
                        placeholder="Introdueix la descripció del llibre"
                        value={descripcio}
                        onChangeText={setDescripcio}
                        secureTextEntry={false}
                        icon={false}
                        multiline
                    />

                    <FormInput
                        label="Número ISBN"
                        placeholder="Introdueix el número ISBN"
                        value={isbnData}
                        onChangeText={setIsbn}
                        secureTextEntry={false}
                        icon={false}
                    />

                    <Text style={[styles.text, typography.labelMedium]}>Categories</Text>
                    <CategoryInput />

                    <View style={styles.buttons}>
                        <Button title={"Cancel·la"} onPress={() => navigation.goBack()} />
                        <Button title={"Següent"} onPress={handleNext} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.NormalTurquoise,
        paddingVertical: 22,
        paddingHorizontal: 14,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 1000,
        justifyContent: "center",
    },
    container: {
        paddingVertical: HEADER_HEIGHT,
        flex: 1,
        backgroundColor: colors.NormalTurquoise,
    },
    titles: {
        width: "100%",
        paddingLeft: 24,
        paddingRight: 24,
        gap: 10,
        marginBottom: 27,
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
        width: "100%",
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 27,
        gap: 10,
        paddingLeft: 27,
        paddingRight: 27,
        paddingBottom: 162,
    },
    text: {
        color: colors.DarkGray,
    },
    buttons: {
        flexDirection: "row",
        gap: 31,
        marginTop: 16,
    },
});

export default EntradaScreen2;
