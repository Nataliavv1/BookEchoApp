import React, { useState } from "react";
import { View, StyleSheet, Modal, ScrollView } from "react-native";

import Header from "./Header";
import GoogleBooksList from "./GoogleBooksList";
import TopicsBooks from "../components/topics/TopicsBooks";
import FiltersModal from "../components/modals/FiltersModals";
import PopularBooksList from "../components/books/PopularBooksList";

import ActiveChallengesSection from "../components/challenges/ActiveChallengesSection";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    filter: "",
    printType: "",
    orderBy: "",
    genre: "",
  });

const buildQuery = () => {
  if (searchQuery.length < 3 && !filters.genre) return null;

  let q = "";

  if (searchQuery.length >= 3) {
    q += searchQuery;
  }

  if (filters.genre) {
    q += (q ? "+" : "") + filters.genre;
  }

  const params = [];

  if (filters.filter) params.push(`filter=${filters.filter}`);
  if (filters.printType) params.push(`printType=${filters.printType}`);
  if (filters.orderBy) params.push(`orderBy=${filters.orderBy}`);

  if (params.length) {
    q += "&" + params.join("&");
  }

  return q;
};


  const activeFiltersCount = Object.values(filters).filter((val) => val).length;
const query = buildQuery();
  return (
    <View style={styles.container}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPressFilter={() => setShowFilters(true)}
        activeFiltersCount={activeFiltersCount}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {searchQuery.length < 3 && !filters.genre && <PopularBooksList />}

        <TopicsBooks
          selectedTopic={filters.genre}
          setSelectedTopic={(genre) => setFilters({ ...filters, genre })}
        />

        <ActiveChallengesSection />
      </ScrollView>

        {query && (
      <GoogleBooksList query={query} style={styles.listOverlay} />
    )}

      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <FiltersModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  listOverlay: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    zIndex: 100,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
