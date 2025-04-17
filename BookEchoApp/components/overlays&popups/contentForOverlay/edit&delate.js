import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Asegúrate de importar AntDesign
import DelatePopup from './DelatePopup'; // Asegúrate de importar DelatePopup

export default function EditDelateOptions({ title, delateText, editText }) {

    const handleEditPress = () => {
        // Aquí puedes poner la lógica para mostrar el componente DelatePopup
        // Ejemplo:
        // setShowPopup(true);
    };

    return (
        <View>
            {/* Título del modal */}
            <Text style={styles.title}>{title}</Text>

            {/* Opción de eliminar */}
            <TouchableOpacity style={styles.option} onPress={() => {}}>
                <View style={styles.row}>
                    <AntDesign name="delete" size={24} color="black" />
                    <Text style={styles.buttonText}>{delateText}</Text>
                </View>
            </TouchableOpacity>

            {/* Opción de editar */}
            <TouchableOpacity style={styles.option} onPress={handleEditPress}>
                <View style={styles.row}>
                    <AntDesign name="edit" size={24} color="black" />
                    <Text style={styles.buttonText}>{editText}</Text>
                </View>
            </TouchableOpacity>

            {/* Aquí puedes colocar el código para mostrar DelatePopup si es necesario */}
            {/* <DelatePopup /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
    },
    option: {
        width: '95%',
        borderTopWidth: 1,
        borderTopColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
