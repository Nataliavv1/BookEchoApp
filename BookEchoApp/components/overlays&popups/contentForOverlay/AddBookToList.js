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
import { supabase } from '../../../screens/Supabase/lib/supabaseClient';

export default function AddBookToList({ visible, onCancel, bookTitle, book }) {
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


const afegirLlibreALlista = async (llistaId, book) => {
  try {
    const bookId = book.isbn?.identifier;
    if (!bookId) {
      alert("El llibre no té un ID vàlid.");
      return;
    }

    // 1. Comprovar si el llibre ja està a la llista
    const { data: existing, error: selectError } = await supabase
      .from('llibrellista')
      .select('*')
      .eq('llista_id', llistaId)
      .eq('llibre_id', bookId)
      .limit(1);

    if (selectError) {
      console.error('Error comprovant el llibre a la llista:', selectError);
      alert("Hi ha hagut un error comprovant la llista.");
      return;
    }

    if (existing && existing.length > 0) {
      alert("Aquest llibre ja és a la llista.");
      return;
    }

    // 2. Comprovar si el llibre existeix a la taula 'llibre'
    const { data: bookExists, error: existsError } = await supabase
      .from('llibre')
      .select('id')
      .eq('id', bookId)
      .single();

    if (existsError && existsError.code !== 'PGRST116') {
      console.error('Error comprovant si el llibre existeix:', existsError);
      alert("Hi ha hagut un error comprovant el llibre.");
      return;
    }

    // 3. Si no existeix, guardar-lo
    if (!bookExists) {
      // Funció SaveBook simplificada aquí (hauries de tenir-la definida)
      const autors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || null;
      const categories = Array.isArray(book.categories) ? book.categories.join(', ') : book.categories || null;
      const descripcio = book.description || null;
      const titol = book.title || null;
      const id = bookId;

      if (!id || !titol) {
        alert("El llibre no té dades suficients per guardar-lo.");
        return;
      }

      const newBook = {
        id,
        titol,
        descripcio,
        autors,
        categories,
        imatge: book.image || null,
        puntuaciogoogle: book.googleRating || null,
        npuntuaciogoogle: book.googleRatingCount || null,
        puntuaciomitjana: book.averageRating || null,
        npuntuaciomitjana: book.ratingCount || null,
      };

      const { data: savedData, error: saveError } = await supabase
        .from('llibre')
        .insert([newBook]);

      if (saveError) {
        console.error('Error guardant el llibre:', saveError);
        alert("No s'ha pogut guardar el llibre.");
        return;
      }
    }

    // 4. Afegir el llibre a la llista
    const { data: insertData, error: insertError } = await supabase
      .from('llibrellista')
      .insert([{ llista_id: llistaId, llibre_id: bookId }]);

    if (insertError) {
      console.error('Error afegint el llibre a la llista:', insertError);
      alert("No s'ha pogut afegir el llibre a la llista.");
      return;
    }

    alert(`Llibre afegit a la llista amb id ${llistaId}`);
    onCancel(); // Tancar modal

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
                                onPress={() => afegirLlibreALlista(llista.id, book)}
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