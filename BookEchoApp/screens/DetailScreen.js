import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
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

import { fetchReviewsByBook } from "../Model/ReviewModel";
import { useUser } from "../context/UserContext";

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { titol, imatge, autors, id } = route.params;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("option1");
  const { userProfile } = useUser();
  const [userReview, setUserReview] = useState(null);

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

  // Recarregar la ressenya de l'usuari també al tornar a la pantalla (focus)
  useFocusEffect(
    useCallback(() => {
      async function loadReviews() {
        try {
          const reviews = await fetchReviewsByBook(id);
          const myReview = reviews.find(r => r.user_id === userProfile?.id);
          setUserReview(myReview || null);
        } catch (error) {
          console.error('Error carregant ressenyes:', error.message);
        }
      }

      loadReviews();
    }, [id, userProfile?.id])
  );

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
          contentType="BookOptions"
          bookTitle={book.title}
          bookId={book.id}
          library={'MaterialCommunityIcons'}
          icon={"dots-vertical"}
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
        <ToggleReadState book={{
          id: book.isbn?.identifier,
          isbn: book.isbn?.identifier,
          descripcio: book.description,
          autors: book.autors,
          categories: book.categories,
          imatge: book.imatge,
          titol: book.title,
          puntuaciogoogle: book.averageRating,
          npuntuaciogoogle: book.ratingCount,
          puntuaciomitjana: 0,
          npuntuaciomitjana: 0,
        }} />

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
              <Text style={typography.bodyRegular}>{book.description ? cleanHtmlToTextCompact(book.description) : "Sin descripción"}</Text>

              <Text style={typography.H3Bold}>Gèneres</Text>
              <Text style={typography.bodyRegular}>{book.categories.length > 0 ? book.categories.join(', ') : "Sense gèneres disponibles"}</Text>

              <Text style={typography.H3Bold}>Número ISBN</Text>
              <Text style={typography.bodyRegular}>{book.isbn?.identifier || "Sense ISBN disponible"}</Text>

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
              {userReview ? (
                <UserReviewCard
                  rating={userReview.rating}
                  title={userReview.title}
                  content={userReview.review}
                  date={new Date(userReview.created_at).toLocaleDateString('ca-ES')}
                  userName={userReview.user?.username || 'Usuari'}
                  userImageUri={userReview.user?.avatar_url || null}
                />
              ) : (
                <StarRating
                  onSubmit={(rating) => {
                    navigation.navigate('AddReview', {
                      bookId: id,
                      bookTitle: book.title,
                      rating: rating,
                    });
                  }}
                />
              )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
