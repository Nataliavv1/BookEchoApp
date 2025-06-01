import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// Context per accedir al perfil
//import { supabase } from './Supabase/lib/supabaseClient';
import { useUser } from '../context/UserContext';

import ChallengeCard from '../components/cards/ChallengeCard';
import TrophyCard from '../components/cards/TrophyCard';
import BackButton from '../components/buttons/backbutton';
import Button from '../components/buttons/button';
//import { useChallenges } from '../context/ChallengeContext';
import challenges, { fetchUserChallenges } from '../components/data/challengesData';


export default function ChallengeScreen({ navigation }) {  
  
  const { userProfile: user } = useUser(); // Usuari actual
   
  const [myChallenges, setMyChallenges] = useState([]);

  useEffect(() => {
    if (user?.id) {
      loadChallenges();
    }
  }, [user]);

  const loadChallenges = async () => {
  try {
    const userChallenges = await fetchUserChallenges(user.id);

    const userChallengeMap = {};
    userChallenges.forEach((uc) => {
      userChallengeMap[uc.idrepte.toString()] = uc;
    });

    const mergedChallenges = challenges.map((c) => {
      const userData = userChallengeMap[c.id];
      return {
        ...c,
        completed: userData ? userData.progres : 0,
        total: c.total,
        isActive: !!userData, // true si l'usuari ha començat aquest repte
      };
    });

    myChallenges.slice(0, 5).map((item) => (
      <ChallengeCard
        key={item.id}
        image={item.image}
        title={item.title}
        description={item.description}
        completed={item.completed || 0}
        total={item.total || 1}
        backgroundColor={item.backgroundColor}
        progressColor={item.progressColor}
        isActive={item.completed > 0}
      />
    ))


    setMyChallenges(mergedChallenges);
  } catch (error) {
    console.error('Error carregant reptes de l’usuari:', error);
  }
};

  if (!user) {
    return <Text>Carregant usuari...</Text>;
  }


  const handleSeeAll = () => {
    navigation.navigate('AllChallengesScreen');
  };

  const completedChallenges = myChallenges.filter(
    (challenge) => challenge.completed === challenge.total
  );

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {myChallenges.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Encara no tens reptes actius.</Text>
            <Button
              title="Comença un repte"
              onPress={handleSeeAll}
            />
          </View>
        ) : (
          myChallenges.slice(0, 5).map((item) => (
            <ChallengeCard
              isActive={item.completed > 0}
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              completed={item.completed || 0}
              total={item.total || 1}
              backgroundColor={item.backgroundColor}
              progressColor={item.progressColor}
            />
          ))
        )}

        <View style={styles.trophySection}>
          <Text style={styles.trophyTitle}>Els meus trofeus</Text>
          {completedChallenges.length > 0 ? (
            <View style={styles.trophyList}>
              {completedChallenges.map((item) => (
                <TrophyCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyTrophyText}>
              Encara no has completat cap repte.
            </Text>
          )}
        </View>

      </ScrollView>
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
    fontWeight: '700',
  },
  scrollContent: {
    padding: 10,
  },
  emptyState: {
    alignItems: 'center',
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#626262',
    textAlign: 'center',
    marginBottom: 10,
  },
  trophySection: {
    marginTop: 20,
  },
  trophyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#358177',
    marginBottom: 10,
    marginLeft: 5,
  },
  trophyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyTrophyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#626262',
    textAlign: 'center',
    marginTop: 10,
  },
});
