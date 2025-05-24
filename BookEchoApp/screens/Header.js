import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchInput from '../components/inputs/SearchInput';
import IconButton from '../components/buttons/iconbutton2';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import colors from '../styles/colors';
import typography from '../styles/typography';

export default function Header({ searchQuery, setSearchQuery, onPressFilter, activeFiltersCount }) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <FontAwesome name="user-circle-o" size={42} color="gray" />
        <Text style={styles.userText}>User</Text>
      </View>

      <View style={styles.searchRow}>
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
        <View>
          <IconButton onPress={onPressFilter} title="filter" color="black">
            <AntDesign name="filter" size={22} color="black" />
          </IconButton>
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.spacing}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingHorizontal: 27,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 15,
  },
  userText: {
    fontSize: 20,
    color: '#3B3B3B3B',
    marginLeft: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacing: {
    marginBottom: 25,
  },
  filterBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
