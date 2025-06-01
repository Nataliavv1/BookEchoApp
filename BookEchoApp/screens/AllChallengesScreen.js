import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import ChallengeCard from '../components/cards/ChallengeCard';
import challenges from '../components/data/challengesData'; // importa l'array local

export default function AllChallengesScreen() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Tots els reptes</Text>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChallengeCard
            image={item.image}
            title={item.title}
            description={item.description}
            completed={0}          // Forcem 0 perquè no mostri progressos
            total={item.total}
            backgroundColor={item.backgroundColor}
            progressColor={item.backgroundColor}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 36,
    marginBottom: 10,
    color: '#358177',
  },
  list: {
    paddingBottom: 20,
  },
});
