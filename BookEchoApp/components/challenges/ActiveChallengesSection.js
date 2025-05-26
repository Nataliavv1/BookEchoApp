import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChallenges } from '../../context/ChallengeContext';
import ChallengeCard from '../cards/ChallengeCard';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 20;

export default function ActiveChallengesSection() {
  const navigation = useNavigation();
  const { myChallenges } = useChallenges();

  const hasMultipleChallenges = myChallenges && myChallenges.length > 1;

  const cardWidth = hasMultipleChallenges
    ? screenWidth * 0.75
    : screenWidth - horizontalPadding * 2;

  if (!myChallenges || myChallenges.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[typography.H2Bold, { color: colors.HoverDarkGrey, marginBottom: 15 }]}>
          Reptes Actius
        </Text>
        <Text style={styles.message}>
          No tens reptes actius. Ves a{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('AllChallengesScreen')}>
            "Reptes"
          </Text>{' '}
          per començar-ne un!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[typography.H2Bold, { color: colors.HoverDarkGrey, marginBottom: 15 }]}>
        Reptes Actius
      </Text>

      <FlatList
        data={myChallenges.slice(0, 10)}
        keyExtractor={item => item.id}
        horizontal={hasMultipleChallenges}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, paddingLeft: hasMultipleChallenges ? 5 : 0 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AllChallengesScreen')}
            activeOpacity={0.8}
            style={[
              styles.cardWrapper,
              {
                width: cardWidth,
                marginRight: hasMultipleChallenges ? 15 : 0,
                alignSelf: 'center',
              },
            ]}
          >
            <ChallengeCard
              image={item.image}
              title={item.title}
              description={item.description}
              completed={item.completed || 0}
              total={item.total || 1}
              backgroundColor={item.backgroundColor || '#fff'}
              progressColor={item.progressColor || '#47AC9E'}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AllChallengesScreen')}
        style={styles.seeAllBtn}
      >
        <Text style={styles.seeAllText}>Veure tots els reptes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  message: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#626262',
    marginBottom: 20,
  },
  link: {
    color: '#47AC9E',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  cardWrapper: {
    marginBottom: 15,
  },
  seeAllBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  seeAllText: {
    color: '#47AC9E',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
