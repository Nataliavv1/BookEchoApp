import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function SearchInput({ value, onChangeText }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onChangeText('');
    };

    return (
        <View style={[styles.container, isFocused && styles.containerFocused]}>
            <AntDesign
                name="search1"
                size={15}
                color={isFocused ? colors.LightActiveGrey : '#E7E7E7'}
                style={styles.icon}
            />

            <TextInput
                style={[
                    styles.input,
                    typography.labelRegular,
                    Platform.OS === 'web' && styles.inputWeb, // ⬅️ estilo especial para web
                ]}
                placeholder="Buscar llibres..."
                placeholderTextColor={isFocused ? colors.LightActiveGrey : '#E7E7E7'}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {value.length > 0 && (
                <TouchableOpacity onPress={handleClear}>
                    <AntDesign
                        name="close"
                        size={16}
                        color={colors.LightActiveGrey}
                        style={styles.clearIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: colors.NormalOrange,
        borderRadius: 5,
        paddingHorizontal: 13,
        height: 32,
        marginRight: 10,
    },
    containerFocused: {
        borderColor: colors.NormalOrange,
        backgroundColor: colors.LightOrange,
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        color: colors.NormalGrey,
        paddingVertical: 6,
    },
    inputWeb: {
        outlineStyle: 'none',
        boxShadow: 'none',
        borderWidth: 0,
    },
    clearIcon: {
        marginLeft: 5,
    },
});
