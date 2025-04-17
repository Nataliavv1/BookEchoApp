import { useState } from 'react';  // Asegúrate de importar useState
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Asegúrate de importar AntDesign
import DelatePopup from './DelatePopup'; // Asegúrate de importar DelatePopup

export default function EditDelateOptions({ title, delateText, editText }) {

    const [showDelatePopup, setShowDelatePopup] = useState(false);

    const handleEditPress = () => {
        // Aquí puedes poner la lógica para mostrar el componente de editar
        // (Puedes agregar la lógica que necesites aquí)
    };

    const handleDelatePress = () => {
        // Al presionar la opción de eliminar, mostramos el popup
        setShowDelatePopup(true);
    };

    const handleClosePopup = () => {
        // Cuando el popup se cierre, ocultamos el popup
        setShowDelatePopup(false);
    };

    return (
        <View>
            {/* Título del modal */}
            <Text style={styles.title}>{title}</Text>

            {/* Opción de eliminar */}
            <TouchableOpacity style={styles.option} onPress={handleDelatePress}>
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

            {/* Mostrar el popup de eliminar solo cuando showDelatePopup es true */}
            {showDelatePopup && (
                <DelatePopup
                    title="Confirmar Eliminación"
                    text="¿Estás seguro de que deseas eliminar este elemento?"
                    visible={showDelatePopup}
                    onClose={handleClosePopup}
                />
            )}
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
