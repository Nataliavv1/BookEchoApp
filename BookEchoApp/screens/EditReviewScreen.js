import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import StarRating from '../components/detailScreenComp/StarRating';
import Button from '../components/buttons/button';
import FormInput from '../components/inputs/FormInput';
import { supabase } from './Supabase/lib/supabaseClient';
import typography from '../styles/typography';
import { Ionicons } from '@expo/vector-icons';

const EditReviewScreen = ({ route, navigation }) => {
    const { reviewId, bookTitle } = route.params;
    const [title, setTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchReview = async () => {
            const { data, error } = await supabase
                .from('ressenyes')
                .select('title, review, rating')
                .eq('id', reviewId)
                .single();

            if (error) {
                Alert.alert('Error', 'No s\'ha pogut carregar la ressenya.');
                return;
            }

            setTitle(data.title);
            setReviewText(data.review);
            setRating(data.rating);
        };

        fetchReview();
    }, [reviewId]);

    const handleUpdate = async () => {
        if (!title.trim() || !reviewText.trim()) {
            Alert.alert('Error', 'El títol i la ressenya no poden estar buits.');
            return;
        }

        const { error } = await supabase
            .from('ressenyes')
            .update({
                title,
                review: reviewText,
                rating,
                created_at: new Date().toISOString(),
            })
            .eq('id', reviewId);

        if (error) {
            Alert.alert('Error', 'No s\'ha pogut actualitzar la ressenya.');
        } else {
            Alert.alert('Ressenya actualitzada');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <BackButton />

            <Text style={styles.pageTitle}>Editar ressenya</Text>
            <Text style={styles.bookTitle}>
                Per al llibre: <Text style={{ fontWeight: 'bold' }}>{bookTitle}</Text>
            </Text>

            <View style={styles.ratingDateRow}>
                <StarRating
                    initialRating={rating}
                    onRatingChange={setRating}
                    showButton={false}
                    showTitle={false}
                />
                <View style={styles.dateRow}>
                    <Ionicons name="time-outline" size={24} color="#626262" style={{ marginRight: 6 }} />
                    <Text style={[typography.H3Regular, { color: '#626262' }]}>
                        {new Date().toLocaleDateString('ca-ES')}
                    </Text>
                </View>
            </View>

            <FormInput
                label="Títol"
                placeholder="Introdueix el títol de la ressenya"
                value={title}
                onChangeText={setTitle}
                icon={false}
            />

            <FormInput
                label="Ressenya"
                placeholder="Edita la teva ressenya..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                secureTextEntry={false}
                icon={false}
            />

            <Button title="Desar canvis" onPress={handleUpdate} color="#47AC9E" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        color: '#358177',
    },
    bookTitle: {
        fontSize: 16,
        color: '#626262',
        marginBottom: 20,
    },
    ratingDateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default EditReviewScreen;
