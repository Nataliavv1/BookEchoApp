import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ChallengeCard from '../components/cards/ChallengeCard';

export default function ChallengeScreen({ navigation }) {
  const challenges = [
    {
      id: '1',
      image: require('../assets/narrador.png'),
      title: 'El Narrador',
      description: 'Escriure una ressenya detallada d\'un llibre llegit.',
      completed: 0,
      total: 1,
      backgroundColor: '#FEF2ED',
      progressColor: '#F8794A',
    },
    {
      id: '2',
      image: require('../assets/multitasca.png'),
      title: 'Multitasca Literària',
      description: 'Llegir dos llibres alhora en un mes.',
      completed: 1,
      total: 2,
      backgroundColor: '#FEF8E6',
      progressColor: '#F8BD01', 
    },
    {
      id: '3',
      image: require('../assets/lectorSocial.png'),
      title: 'El Lector Social',
      description: 'Comentar en 5 ressenyes de llibres a la comunitat.',
      completed: 4,
      total: 5,
      backgroundColor: '#F7EDF7',
      progressColor: '#AC47AC',
    },
    {
      id: '4',
      image: require('../assets/bibliotecari.png'),
      title: 'El Bibliotecari',
      description: 'Afegeix 5 llibres a la llista de lectura.',
      completed: 4,
      total: 5,
      backgroundColor: '#EDF7F5',
      progressColor: '#47AC9E',
    },
  ];

  const handlePress = (challenge) => {
    console.log('Challenge seleccionado:', challenge.title);
    // navigation.navigate('ChallengeDetail', { challengeId: challenge.id });
  };

  const handleSeeAll = () => {
    navigation.navigate('AllChallengesScreen'); 
  };

  return (
    <View style={styles.container}>
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
            onPress={() => handlePress(item)}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 36,
    marginBottom: 10,
    color: '#358177',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

