import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ToggleReadState() {
    const [selected, setSelected] = useState('none');

    const options = [
        { key: 'toRead', label: 'Per llegir', icon: 'bookmark-outline' },
        { key: 'reading', label: 'Llegint', icon: 'eye-outline' },
        { key: 'read', label: 'Llegit', icon: 'check-bold' },
    ];

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <View>
                    <TouchableOpacity
                        key={option.key}
                        style={[
                            styles.button,
                            selected === option.key && styles.buttonSelected
                        ]}
                        onPress={() =>
                            setSelected(selected === option.key ? 'none' : option.key)
                        }
                    >
                        <MaterialCommunityIcons
                            name={option.icon}
                            size={24}
                            color={selected === option.key ? '#fff' : '#F8794A'}
                        />
                    </TouchableOpacity>
                    <Text style={[
                        styles.buttonText,
                        selected === option.key && styles.buttonText
                    ]}>
                        {option.label}
                    </Text>
                </View>

            ))}
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#FEF2ED',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        backgroundColor: '#F8794A',
    },
    buttonText: {
        color: '#626262',
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
        fontFamily: 'Raleway_400Regular',
        
    },
});
