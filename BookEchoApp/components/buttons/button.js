import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import typography from '../../styles/typography';

export default function Button({ title, onPress, icon, color, fontcolor }) {
    const backgroundColor = color || '#F8794A'; // usa color si está definido, si no, usa el naranja
    const textColor = fontcolor || '#FFFFFF';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }]}
        >
            {icon && (
                <MaterialCommunityIcons name={icon} size={24} color={textColor} />
            )}
            <Text style={[styles.text, { color: textColor }, typography.buttonRegular]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 16,
        //color: '#FFFFFF',
        marginLeft: 10,
    },
});
