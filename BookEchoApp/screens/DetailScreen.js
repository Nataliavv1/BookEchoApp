import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FetchBook } from "../Model/FetchBook";

import { Ionicons } from '@expo/vector-icons';
import Overlay from "../components/overlays&popups/Overlay";
import Toggle from "../components/buttons/toggle";
import ToggleReadState from "../components/buttons/toggleReadState";
import Rates from "../components/detailScreenComp/rates";
import BackButton from "../components/buttons/backbutton";
import StarRating from "../components/detailScreenComp/StarRating";
import UserReviewCard from "../components/detailScreenComp/UserReview";

import colors from '../styles/colors';
import typography from '../styles/typography';
import IconButton from "../components/buttons/iconbutton";

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { titol, imatge, autors, id } = route.params;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option1");
  const [review, setReview] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const data = await FetchBook(id);
        setBook(data);
      } catch (err) {
        setError("No se pudo cargar el libro.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
       
        <Text
          style={[styles.headertitle, typography.subtitleLight]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {book.title}
        </Text>
 <Overlay
          style={[styles.overlay, typography.subtitleRegular]}
       /*   title="Opcions de Llibre"
          delateText="Afegeix a una llista de llibres"
          editText="Comparteix"*/
          contentType="BookOptions"
          bookTitle={book.title}
        />
        <IconButton
          library="MaterialCommunityIcons"
          icon="dots-vertical"
          color="#000"
          onPress={() => console.log('Icon pressed!')}
        />


      </View>

      <View style={styles.mainInfo}>
        <Image source={{ uri: imatge }} style={styles.thumbnail} />
        <Text style={styles.title}>{book.title || "Sense ISBN disponible"}</Text>
        <Text style={styles.author}>
          {Array.isArray(autors) ? autors.join(', ') : autors}
        </Text>
        <View style={styles.puntuacio}>
          <Ionicons name="star" size={24} color={'#F8BD01'} />
          <Text>{book.averageRating !== null ? book.averageRating : "Sense puntuació"}</Text>
        </View>
      </View>

      <View style={styles.containerInfo}>
        <ToggleReadState />
        <Toggle
          text1={'Informació'}
          text2={'Ressenyes(143)'}
          selected={selectedOption}
          onChange={setSelectedOption}
        />

        <View style={styles.dynamicContainer}>
          {selectedOption === "option1" && (
            <View style={[styles.content1, { color: colors.DarkerTurquoise }]}>
              <Text style={typography.H3Bold}>Descripció</Text>
              <Text>{book.description ? cleanHtmlToTextCompact(book.description) : "Sin descripción"}</Text>

              <Text style={typography.H3Bold}>Gèneres</Text>
              <Text>{book.categories.length > 0 ? book.categories.join(', ') : "Sense gèneres disponibles"}</Text>

              <Text style={typography.H3Bold}>Número ISBN</Text>
              <Text>{book.isbn?.identifier || "Sense ISBN disponible"}</Text>

              <Text style={typography.H3Bold}>Similars</Text>
            </View>
          )}

          {selectedOption === "option2" && (
            <View style={{ alignItems: 'center' }}>
              <Text>Puntuacions</Text>
              <Rates
                rate={book.averageRating || 0}
                users={book.ratingCount || 0}
                distribution={[5, 20, 30, 40, 28]}
              />

              {review ? (
                <UserReviewCard
                  rating={review.rating}
                  title={review.title}
                  content={review.text}
                  date={review.date}
                />
              ) : (
                <StarRating
                  onSubmit={(rating) => {
                    navigation.navigate('AddReview', {
                      bookId: id,
                      bookTitle: book.title,
                      rating: rating,
                      onReviewSubmit: (newReview) => {
                        setReview(newReview);
                        setSelectedOption("option2");
                      }
                    });
                  }}
                />
              )}


              <Text style={{ marginTop: 24 }}>Ressenyes d'altres usuaris</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

function cleanHtmlToTextCompact(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C6E5E1',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 40,
    marginBottom: 26,
    gap: 18,
    alignItems: 'center',       // para centrar verticalmente
    justifyContent: 'space-between',  // para separar el contenido si quieres
    flex: 1,
    paddingHorizontal: 27,
  },
  headertitle: {
    flex: 1,
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
    fontFamily: 'Urbanist_400Regular',
  },
  puntuacio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
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
  dynamicContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  content1: {
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;