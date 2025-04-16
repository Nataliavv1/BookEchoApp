import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ButtonReadState() {
    return (
        <TouchableOpacity style={styles.buttonReadState}>
            <MaterialCommunityIcons name='bookmark-outline' size={24} color={'#FFFFFF'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonReadState: {
        padding: 4,
        backgroundColor: '#F8794A', // opcional: color de fondo
        borderRadius: 5,         // bordes redondeados
        alignItems: 'center',
        justifyContent: 'center'
    }
});
