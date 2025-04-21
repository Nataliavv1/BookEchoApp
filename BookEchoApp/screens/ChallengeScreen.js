import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ChallengeCard from '../components/cards/ChallengeCard';
import BackButton from '../components/buttons/backbutton';
import challenges from '../components/data/challengesData';

export default function ChallengeScreen({ navigation }) {

  const handleSeeAll = () => {
    navigation.navigate('AllChallengesScreen');
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Els meus reptes</Text>
        <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeAll}>
          <Text style={styles.seeMoreText}>Veure més</Text>
          <Image 
            source={require('../assets/next.png')}
            style={styles.arrowImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges.slice(0, 3)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#358177',
    marginRight: 65,
    marginLeft: 10,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
  },
  seeMoreText: {
    color: '#47AC9E',
    fontFamily: 'Raleway_700Bold',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  list: {
    padding: 10,
  },
});