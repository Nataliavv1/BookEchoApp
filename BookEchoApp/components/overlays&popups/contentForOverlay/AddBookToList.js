import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Linking } from 'react-native';
import Button from '../../buttons/button';
import IconButton from '../../buttons/iconbutton';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import SaveToListCard from '../../cards/saveToListCard';
import perLlegir from "../../../assets/images/perLlegir.png";

export default function AddBookToList({ visible, onCancel, bookTitle }) {

    return (
        <Modal visible={visible}  statusBarTranslucent>
            <View style={styles.Modal}>
                <IconButton icon={"close"} onPress={onCancel} ></IconButton>
                <Text style={[styles.Title, typography.H2Bold]}> Guardar "{bookTitle}" a</Text>
                <View style={styles.greenLine} />
                <SaveToListCard title={"Per llegir"} image={perLlegir}></SaveToListCard>
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
    }
});