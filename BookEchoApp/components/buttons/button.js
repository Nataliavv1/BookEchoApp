import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} >
            <MaterialCommunityIcons name={icon} size={24} color={color ? color : '#FFFFFF'} />

            <Text style={styles.text}>{title} </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#F8794A',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 10,
    }
})