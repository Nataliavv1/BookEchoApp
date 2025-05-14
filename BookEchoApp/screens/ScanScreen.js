import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Camera, useCameraPermissions } from 'expo-camera';
import Toggle from "../components/buttons/toggle";
import BackButton from "../components/buttons/backbutton";
import typography from "../styles/typography";
import colors from "../styles/colors";

const ScanScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const { status, requestPermission } = useCameraPermissions();
  const [selectedOption, setSelectedOption] = useState("option1");

  // Simulación de lista de libros escaneados
  const scannedBooks = [
    { id: '1', title: 'Llibre 1 escanejat' },
    { id: '2', title: 'Llibre 2 escanejat' },
  ];

  useEffect(() => {
    const getPermissions = async () => {
      const permissionStatus = await requestPermission();
      setHasPermission(permissionStatus.status === 'granted');
    };
    getPermissions();
  }, []);

  if (hasPermission === false) {
    return <Text>No tens permisos per utilitzar la càmera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <BackButton />
        <Text style={[typography.H1Bold, { color: colors.DarkTurquoise }]}>Escanejar Llibre</Text>

        <Toggle
          text1="Escanejar"
          text2={`Escanejats (${scannedBooks.length})`}
          icon1="camera-outline"
          icon2="book-outline"
          color="#F8794A"
          selected={selectedOption}
          onChange={setSelectedOption}
        />
      </View>

      {/* Mostra la càmera o la llista, depenent del toggle */}
      <View style={styles.cameraContainer}>
        {hasPermission && selectedOption === "option1" && (
          <View style={styles.escanejar}>
            {status === "granted" ? (
              <Camera style={styles.camera}>
                <Text style={{ color: '#fff' }}>📷 Escaneja el llibre aquí</Text>
              </Camera>
            ) : (
              <Text style={[typography.H2Bold, { color: colors.LightWhite }]}>Esperant permisos...</Text>
            )}
          </View>
        )}

        {selectedOption === "option2" && (
          <View style={styles.listContainer}>
            <Text style={typography.H2Bold}> Llibres escanejats:</Text>
            <FlatList
              data={scannedBooks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={[typography.H2, { color: colors.DarkTurquoise }]}>{item.title}</Text>
              )}
            />
          </View>
        )}
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
    alignItems: "center",
    backgroundColor: colors.LightWhite,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  escanejar: {
    backgroundColor: colors.DarkerGrey,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default ScanScreen;
