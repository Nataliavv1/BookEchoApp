

import { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import Button from '../../buttons/button'; // Asegúrate de que Button esté correctamente importado
import IconButton from '../../buttons/iconbutton'; // Asegúrate de que IconButton esté correctamente importado

export default function DelatePopup({ title, text }) {
    const [visible, setVisible] = useState(true);

    // Función para cerrar el modal
    const onCancel = () => {
        setVisible(false);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
                <BlurView style={styles.blurBackground} blurType="dark" blurAmount={10} />

                <View style={styles.modalContent}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.buttonsContainer}>
                        <Button title="Cancelar" onPress={onCancel} color={'#EFEFEF'} fontcolor={'#626262'}/>
                        <Button title="Eliminar" onPress={() => { /* Acción de eliminación */ }} />
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(34,34,34,0.4)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        alignItems: 'flex-start',
        zIndex: 1, // Asegura que el contenido del modal esté sobre el fondo borroso
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#193C37',
    },
    text: {
        fontSize: 16,
        color: '#626262',
        marginBottom: 20,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: '31',
    },
});