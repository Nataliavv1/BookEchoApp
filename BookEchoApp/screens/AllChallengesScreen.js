import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../components/buttons/backbutton';
import ChallengeCard from '../components/cards/ChallengeCard';
import { useChallenges } from '../context/ChallengeContext';

export default function AllChallengesScreen() {
  const { myChallenges, availableChallenges, startChallenge } = useChallenges();

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Els meus reptes</Text>

      {myChallenges.length === 0 ? (
        <Text style={styles.emptyText}>Encara no tens reptes actius.</Text>
      ) : (
        <FlatList
          data={myChallenges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChallengeCard
              image={item.image}
              title={item.title}
              description={item.description}
              completed={item.completed}
              total={item.total}
              backgroundColor={item.backgroundColor}
              progressColor={item.progressColor}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Text style={styles.title}>Començar reptes nous</Text>

      {availableChallenges.length === 0 ? (
        <Text style={styles.emptyText}>No hi ha reptes disponibles.</Text>
      ) : (
        <FlatList
          data={availableChallenges}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => startChallenge(item)}>
              <ChallengeCard
                image={item.image}
                title={item.title}
                description={item.description}
                completed={item.completed}
                total={item.total}
                backgroundColor={item.backgroundColor}
                progressColor={item.progressColor}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#626262',
    textAlign: 'center',
    marginVertical: 20,
  },
});