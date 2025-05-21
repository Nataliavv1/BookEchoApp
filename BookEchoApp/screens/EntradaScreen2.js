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
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/inputs/FormInput";
import BackButton from "../components/buttons/backbutton";
import colors from "../styles/colors";
import Button from "../components/buttons/button";
import typography from "../styles/typography";
import AutoComplete from "../components/inputs/AutoComplete";
import uploadCover from "../assets/images/uploadCover.png";
import CategoryInput from "../components/inputs/CategoryInput";

const HEADER_HEIGHT = 112; // Ajusta esta altura según padding y tamaño visual

const EntradaScreen2 = () => {
    const navigation = useNavigation();

    const [titol, setTitol] = useState("");
    const [autors, setAutors] = useState("");
    const [descripcio, setDescripcio] = useState("");
    const [isbn, setIsbn] = useState("");

    const handleNext = () => {
        if (titol.trim() === "" || autors.trim() === "") {
            Alert.alert("Atenció", "Omple com a mínim el títol i l'autor");
            return;
        }

        navigation.navigate("EntradaScreen3", {
            titol,
            autors,
            descripcio,
            isbn,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <BackButton />
            </View>
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
               
            >
                <View style={styles.titles}>
                    <Text style={[styles.title, typography.H1Bold]}>
                        Afegeix un llibre que falta
                    </Text>
                    <Text style={[styles.subtitle, typography.H2Medium]}>Pas 2</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={[styles.text, typography.labelMedium]}>Portada del llibre</Text>
                    <View style={{ flexDirection: "row", gap: 20 }}>
                        <TouchableOpacity /* onPress={} style={} */>
                            <Image source={uploadCover} style={{ width: 96, height: 144 }} />
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
                    <AutoComplete />

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
                        value={isbn}
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
        paddingBottom: 162
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
