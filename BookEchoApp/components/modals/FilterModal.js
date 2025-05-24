import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, Picker, TouchableOpacity } from "react-native";

const FilterModal = ({ visible, onClose, onApplyFilters }) => {
  const [printType, setPrintType] = useState("");
  const [langRestrict, setLangRestrict] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [filter, setFilter] = useState("");

  const applyFilters = () => {
    onApplyFilters({ printType, langRestrict, orderBy, filter });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Filtros</Text>

          <Text>Tipo de impresión</Text>
          <Picker selectedValue={printType} onValueChange={setPrintType}>
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Libros" value="books" />
            <Picker.Item label="Revistas" value="magazines" />
          </Picker>

          <Text>Idioma</Text>
          <Picker selectedValue={langRestrict} onValueChange={setLangRestrict}>
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Español" value="es" />
            <Picker.Item label="Inglés" value="en" />
          </Picker>

          <Text>Ordenar por</Text>
          <Picker selectedValue={orderBy} onValueChange={setOrderBy}>
            <Picker.Item label="Relevancia" value="relevance" />
            <Picker.Item label="Fecha de publicación" value="newest" />
          </Picker>

          <Text>Disponibilidad</Text>
          <Picker selectedValue={filter} onValueChange={setFilter}>
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Vista parcial" value="partial" />
            <Picker.Item label="Libros completos" value="full" />
            <Picker.Item label="Gratis" value="free-ebooks" />
            <Picker.Item label="De pago" value="paid-ebooks" />
          </Picker>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={applyFilters}>
              <Text style={styles.apply}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  container: { backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancel: { color: "red" },
  apply: { color: "green", fontWeight: "bold" },
});

export default FilterModal;
