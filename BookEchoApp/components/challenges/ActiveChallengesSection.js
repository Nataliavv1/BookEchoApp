import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import ChallengeCard from '../cards/ChallengeCard';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import { fetchUserChallenges } from '../data/challengesData';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 20;

export default function ActiveChallengesSection() {
  const navigation = useNavigation();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega reptes de Supabase
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const allChallenges = await fetchUserChallenges();
        const active = allChallenges.filter(
          ch => ch.completed > 0 || ch.status === 'active'
        );
        setChallenges(active);
      } catch (error) {
        console.error('Error carregant reptes:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log('dades de reptes actius carregades!');

    loadChallenges();
  }, []);

  const hasMultipleChallenges = challenges.length > 1;
  const cardWidth = hasMultipleChallenges
    ? screenWidth * 0.75
    : screenWidth - horizontalPadding * 2;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.NormalTurquoise} />
      </View>
    );
  }

  if (challenges.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[typography.H2Bold, { color: colors.HoverDarkGrey, marginBottom: 15 }]}>
          Reptes Actius
        </Text>
        <Text style={styles.message}>
          No tens reptes actius. Ves a{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('AllChallengesScreen')}>
            "Tots els reptes"
          </Text>{' '}
          per començar-ne un!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Títol + botó "veure més" */}
      <View style={styles.headerRow}>
        <Text style={[typography.H2Bold, { color: colors.HoverDarkGrey }]}>Reptes Actius</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AllChallengesScreen')}
          style={styles.seeMoreBtn}
          activeOpacity={0.7}
        >
          <Text style={[typography.labelExtraBold, { color: colors.NormalTurquoise }]}>
            Veure més
          </Text>
          <AntDesign
            name="right"
            size={15}
            color={colors.NormalTurquoise}
            style={{ marginLeft: 4, marginTop: 2 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={challenges.slice(0, 10)}
        keyExtractor={item => item.id}
        horizontal={hasMultipleChallenges}
        showsHorizontalScrollIndicator={false}
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
              isActive={item.completed > 0}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
