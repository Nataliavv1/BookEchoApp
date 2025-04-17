import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton({onPress}) {

    return (
        <TouchableOpacity style={styles.iconButton} onPress={onPress}>
            <MaterialCommunityIcons name='dots-horizontal' size={24} color={'#000'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        padding: 4,
        backgroundColor: '#F1F1F1', // opcional: color de fondo
        borderRadius: 5,         // bordes redondeados
        alignItems: 'center',
        justifyContent: 'center'
    }
});