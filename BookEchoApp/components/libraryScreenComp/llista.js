import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import colors from "../../styles/colors";
import typography from "../../styles/typography";

export default function Llista({ imatge, nomLlista, numllibres, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ gap: 5 }}>
            <Image
                source={typeof imatge === 'string' ? { uri: imatge } : imatge}
                style={{ width: 145, height: 162, borderRadius: 9 }}
            />
            <View>  
                <Text style={[styles.nom, typography.subtitleBold]}>{nomLlista}</Text>
                <Text style={[styles.num, typography.labelMedium]}>{numllibres} llibres</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    nom: {
        color: colors.DarkActiveGrey,
    },
    num: {
        color: colors.NormalGrey
    }
});
