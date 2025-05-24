import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const topics = [
  { id: 1, name: 'Ficción', subtitle: 'Ficció', color: colors.NormalTurquoise },
  { id: 2, name: 'Misterio', subtitle: 'Misteri', color: colors.NormalOrange },
  { id: 3, name: 'Fantasía', subtitle: 'Fantasia', color: colors.NormalYellow },
  { id: 4, name: 'Ciencia', subtitle: 'Ciencia', color: colors.NormalPurple },
  { id: 5, name: 'Suspenso', subtitle: 'Suspens', color: colors.NormalGreen },
  { id: 6, name: 'Películas', subtitle: 'Cinema', color: colors.NormalRed },
];

const filterOptions = [
  { label: 'Todos', value: '' },
  { label: 'Ebooks', value: 'ebooks' },
  { label: 'Ebooks Gratis', value: 'free-ebooks' },
  { label: 'Libros Completos', value: 'full' },
  { label: 'Ebooks de Pago', value: 'paid-ebooks' },
  { label: 'Vista Parcial', value: 'partial' },
];

const printTypeOptions = [
  { label: 'Todos', value: '' },
  { label: 'Libros', value: 'books' },
  { label: 'Revistas', value: 'magazines' },
];

const orderByOptions = [
  { label: 'Relevancia', value: 'relevance' },
  { label: 'Más Nuevos', value: 'newest' },
];

export default function FiltersModal({ filters, setFilters, onClose }) {

  // Función para cambiar filtros (toggle si es el mismo valor)
  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={[styles.title, typography.H2Bold]}>Filtros</Text>

        {/* Género (Topic) */}
        <Text style={[styles.subtitle, typography.H4SemiBold]}>Género</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {topics.map(({ id, name, subtitle, color }) => {
            const selected = filters.genre === name;
            return (
              <Pressable
                key={id}
                onPress={() => toggleFilter('genre', name)}
                style={[
                  styles.optionButton,
                  { backgroundColor: selected ? color : colors.LightGrey },
                ]}
              >
                <Text style={{ color: selected ? colors.NormalWhite : colors.DarkGrey }}>
                  {subtitle}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Filter */}
        <Text style={[styles.subtitle, typography.H4SemiBold]}>Tipo de filtro</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {filterOptions.map(({ label, value }) => {
            const selected = filters.filter === value;
            return (
              <Pressable
                key={value}
                onPress={() => toggleFilter('filter', value)}
                style={[
                  styles.optionButton,
                  { backgroundColor: selected ? colors.NormalTurquoise : colors.LightGrey },
                ]}
              >
                <Text style={{ color: selected ? colors.NormalWhite : colors.DarkGrey }}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Print Type */}
        <Text style={[styles.subtitle, typography.H4SemiBold]}>Tipo de impresión</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {printTypeOptions.map(({ label, value }) => {
            const selected = filters.printType === value;
            return (
              <Pressable
                key={value}
                onPress={() => toggleFilter('printType', value)}
                style={[
                  styles.optionButton,
                  { backgroundColor: selected ? colors.NormalOrange : colors.LightGrey },
                ]}
              >
                <Text style={{ color: selected ? colors.NormalWhite : colors.DarkGrey }}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Order By */}
        <Text style={[styles.subtitle, typography.H4SemiBold]}>Ordenar por</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {orderByOptions.map(({ label, value }) => {
            const selected = filters.orderBy === value;
            return (
              <Pressable
                key={value}
                onPress={() => toggleFilter('orderBy', value)}
                style={[
                  styles.optionButton,
                  { backgroundColor: selected ? colors.NormalRed : colors.LightGrey },
                ]}
              >
                <Text style={{ color: selected ? colors.NormalWhite : colors.DarkGrey }}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Botón para cerrar modal */}
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={typography.buttonBold}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.NormalWhite,
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  title: {
    marginBottom: 20,
    color: colors.DarkHoverGrey,
  },
  subtitle: {
    marginBottom: 10,
    color: colors.DarkHoverGrey,
    fontWeight: '600',
  },
  scrollContainer: {
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: colors.NormalTurquoise,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
