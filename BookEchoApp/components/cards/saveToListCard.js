import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function SaveToListCard({ image, title }) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} resizeMode="cover"  source={typeof imatge === 'string' ? { uri: image } : image}/>
            <Text style={[typography.labelBold, styles.title]}>{title}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.NormalWhite,
        padding: 10,
        borderRadius: 12,
        gap: 13,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    title: {
        color: colors.DarkActiveGrey,
    },
});