import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton({onPress, color, icon}) {

    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
         {/*    <MaterialCommunityIcons name={icon} size={24} color={color} /> */} 
         <AntDesign name={icon} size={24} color={color} /> 
        </Pressable>
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