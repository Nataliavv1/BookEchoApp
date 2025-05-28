import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import BackButton from '../components/buttons/backbutton';

const LlistaDetall = ({ route, navigation }) => {
  const { llistaId, nom, numllibres } = route.params;
    return (
    <ScrollView>
      <View style={styles.header}>
        <BackButton />
      </View>
      <Text>{nom}</Text>
      <Text>{numllibres} llibres</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    header: {
           flex: 1,
    paddingHorizontal: 27,
    },
});

export default LlistaDetall;