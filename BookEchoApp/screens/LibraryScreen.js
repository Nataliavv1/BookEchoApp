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
import { fetchLlistes } from "../Model/FetchLlistes";
import { useUser } from '../context/UserContext';

const LibraryScreen = () => {
    const [llistes, setLlistes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState("option1");
    const { userProfile } = useUser();
    useEffect(() => {
        async function carregarLlistes() {
            if (!userProfile) return;
            const data = await fetchLlistes(userProfile);
            if (data) setLlistes(data);
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
                <Toggle text1="Les meves llistes" text2="Tots els llibres" selected={selectedOption} onChange={setSelectedOption}></Toggle>
                <View style={styles.modifyList}>
                    <Dropdown></Dropdown>
                    <IconButton icon={'plus'}></IconButton>
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
                                        numllibres={0}
                                    />
                                );
                            })}
                        </View>
                    )}

                    {selectedOption === "option2" && (
                        <View></View>
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
        textAlign: "center",
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
