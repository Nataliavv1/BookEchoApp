import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import Button from "../components/buttons/button";
import ButtonReadState from "../components/buttons/buttonReadState";
import IconButton from "../components/buttons/iconbutton";
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";
import Dropdown from "../components/buttons/dropDown";
import colors from "../styles/colors";
import typography from "../styles/typography";
import Llista from "../components/libraryScreenComp/llista";
import perLlegir from "../assets/images/perLlegir.png";
import { fetchLlistes, selectCount } from "../Model/FetchLlistes";
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { fetchLlibresByLlistaId } from '../Model/fetchLlibresByLlistaId';

const LibraryScreen = () => {
    const [llistes, setLlistes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("option1");
    const { userProfile } = useUser();
    const navigation = useNavigation();
    /*useEffect(() => {
        async function carregarLlistes() {
            if (!userProfile) return;
            const data = await fetchLlistes(userProfile);
            if (data) setLlistes(data);
            setLoading(false);
        }
        carregarLlistes();
    }, [userProfile]);*/

    useEffect(() => {
        async function carregarLlistes() {
            if (!userProfile) return;
            const data = await fetchLlistes(userProfile);
            if (data) {
                // Para cada llista, obtener su count
                const llistesAmbCount = await Promise.all(
                    data.map(async (llista) => {
                        const count = await selectCount(llista.id);
                        return { ...llista, numllibres: count || 0 };
                    })
                );
                setLlistes(llistesAmbCount);
            }
            setLoading(false);
        }
        carregarLlistes();
    }, [userProfile]);


    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} />;
    }

    return (
        <ScrollView>

            <View style={styles.container}>
                <Text style={[styles.title, typography.H1Bold]}>La Meva Biblioteca</Text>
                <Toggle
                    text1="Les meves llistes"
                    text2="Tots els llibres"
                    color="#F8794A"
                    selected={selectedOption}
                    onChange={setSelectedOption} />
                <View style={styles.modifyList}>
                    <Dropdown></Dropdown>
                    <Overlay icon={'plus'} contentType={'CreateList'}></Overlay>
                </View>

                <View style={styles.dynamicContainer}>
                    {selectedOption === "option1" && (
                        <View style={styles.llistesContainer}>
                            {llistes.map((llista, index) => {

                                console.log("Llista completa:", llista);
                                return (
                                    <Llista
                                        key={index}
                                        nomLlista={llista.nom}
                                        imatge={llista.image}
                                        numllibres={llista.numllibres}
                                        onPress={() =>
                                            navigation.navigate('LlistaDetall', {
                                                llistaId: llista.id,
                                                nom: llista.nom,
                                                numllibres: llista.numllibres,
                                            })
                                        }
                                    />
                                );
                            })}
                        </View>
                    )}

                    {selectedOption === "option2" && (
                        <View>
                        </View>
                    )}

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modifyList: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        color: colors.DarkTurquoise,
    },
    llistesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 16,
        maxWidth: 306,


    }
});

export default LibraryScreen;
