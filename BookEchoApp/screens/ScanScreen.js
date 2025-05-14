import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView } from 'expo-camera'; // Importa CameraView de Expo Camera
import { useCameraPermissions } from 'expo-camera';
import Toggle from "../components/buttons/toggle";
import BackButton from "../components/buttons/backbutton";

const ScanScreen = ({ route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const { status, requestPermission } = useCameraPermissions();

    useEffect(() => {
        const getPermissions = async () => {
            const permissionStatus = await requestPermission();
            setHasPermission(permissionStatus.status === 'granted');
        };
        getPermissions();
    }, []);


    if (hasPermission === false) {
        return <Text>No permission to access camera</Text>;
    }

    return (
        <View style={styles.container}>


            <View style={styles.topContainer}>
                <BackButton></BackButton>
                <Text>Escanejar Llibre</Text>

                <Toggle
                    text1="Escanejar"
                    text2="Escanejats(1)"
                    icon1="camera-outline"
                    icon2="book-outline"
                    color="#F8794A"
                />
            </View>


            {/* Contenidor de la càmera */}
            <View style={styles.cameraContainer}>
                <CameraView style={styles.camera}>
                    {/* Aquí col·loquem el text de "Loading" dins de la càmera */}
                    {hasPermission === null && <Text style={styles.load}>Loading...</Text>}
                    <Text>Hello, scan the book</Text>
                </CameraView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    topContainer: {
        marginTop: 41,
        gap: 36,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        width: '100%',
        marginTop: 10,

        position: 'relative', // Assegura't que la càmera tingui el context adequat
    },
    camera: {
        flex: 1,

        width: '100%',
        height: '100%',
    },
    load: {
        position: 'absolute', // Col·loca el "Loading" sobre la càmera
        top: '50%', // Centrat verticalment
        left: '50%', // Centrat horitzontalment
        transform: [{ translateX: -50 }, { translateY: -50 }], // Centrat exactament al mig
        fontSize: 40,
        color: 'white',
    },
});

export default ScanScreen;

