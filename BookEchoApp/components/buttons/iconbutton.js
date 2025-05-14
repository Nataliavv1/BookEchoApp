import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton({onPress, color, icon}) {

    return (
        <TouchableOpacity style={styles.iconButton} onPress={onPress}>
         {/*    <MaterialCommunityIcons name={icon} size={24} color={color} /> */} 
         <AntDesign name={icon} size={24} color={color} /> 
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        padding: 4,
        borderRadius: 5,         // bordes redondeados
        alignItems: 'center',
        justifyContent: 'center'
    }
});