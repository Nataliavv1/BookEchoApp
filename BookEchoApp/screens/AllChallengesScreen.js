import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../components/buttons/backbutton';

export default function AllChallengesScreen() {
    return (
        <View style={styles.container}>
        <BackButton />
        <Text style={styles.title}>Els meus reptes</Text>
        {/* Aquí luego pondrás todos los retos */}
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
    color: '#358177',
  },
});
