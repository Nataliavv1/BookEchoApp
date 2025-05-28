import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Linking } from 'react-native';
import Button from '../../buttons/button';
import IconButton from '../../buttons/iconbutton';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import SaveToListCard from '../../cards/saveToListCard';
import perLlegir from "../../../assets/images/perLlegir.png";
import { fetchLlistes } from '../../../Model/FetchLlistes';
import { BookToList } from '../../../Model/BookTableModel';
import { useUser } from '../../../context/UserContext';

export default function AddBookToList({ visible, onCancel, bookTitle, bookId }) {
    const { userProfile } = useUser();
      const [llistes, setLlistes]   = useState([]);
   useEffect(() => {
        async function carregarLlistes() {
            if (!userProfile) return;
            const data = await fetchLlistes(userProfile);
            if (data) {
                setLlistes(data); 
            }
        }
        carregarLlistes();
    }, [userProfile]);


const afegirLlibreALlista = async (llistaId) => {
  try {
    // Suposant que tens una funció a Model/AddBookToList.js
    await BookToList(llistaId, bookId); 
    alert(`Llibre afegit a la llista amb id ${llistaId}`);
    onCancel(); // Tancar el modal
  } catch (error) {
    console.error("Error afegint el llibre:", error);
    alert("Hi ha hagut un error. Torna-ho a provar.");
  }
};

    return (
        <Modal visible={visible} statusBarTranslucent>
            <View style={styles.Modal}>
                <IconButton icon={"close"} onPress={onCancel} ></IconButton>
                <Text style={[styles.Title, typography.H2Bold]}> Guardar "{bookTitle}" a</Text>
                <View style={styles.greenLine} />

                <View style={styles.lists}>
                    {llistes.map((llista, index) => {

                        console.log("Llista completa:", llista);
                        return (
                            <SaveToListCard
                                key={index}
                                title={llista.nom}
                                image={llista.image}
                                onPress={() => afegirLlibreALlista(llista.id, bookId )}
                            />

                        );
                    })}
                </View>

                <Text style={[styles.Title2, typography.H2Bold]}>Les meves llistes</Text>
            </View>

        </Modal>

    );
}




const styles = StyleSheet.create({
    Modal: {
        paddingVertical: 27,
        gap: 24,
        paddingHorizontal: 14,
    },
    Title: {
        color: colors.DarkGrey,
    },
    Title2: {
        color: colors.NormalGrey,
    },
    greenLine: {
        height: 2,
        backgroundColor: colors.LightActiveTurquoise,
        width: '100%'
    },
    lists: {
gap: 10,
    },
});