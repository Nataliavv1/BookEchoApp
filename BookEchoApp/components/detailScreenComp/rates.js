import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Rates({ rate = 0, users = 0, distribution = [0, 0, 0, 0, 0] }) {
  const maxValue = Math.max(...distribution, 1); // evitar dividir per zero

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.rateText}>{rate}</Text>
        <Text style={styles.subText}>sobre 5</Text>
      </View>

      <View style={styles.right}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <View key={star} style={styles.row}>
            <View style={styles.stars}>
              {[...Array(star)].map((_, i) => (
                <Ionicons key={i} name="star" size={12} color="#F8BD01" />
              ))}
            </View>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${(distribution[5 - star] / maxValue) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        ))}
        <Text style={styles.userText}>{users} Usuaris han puntuat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    alignItems: 'center',
    marginRight: 16,
  },
  rateText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#12342D',
  },
  subText: {
    fontSize: 14,
    color: '#12342D',
  },
  right: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stars: {
    flexDirection: 'row',
    width: 60,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#FFE3DA',
    borderRadius: 3,
  },
  bar: {
    height: 6,
    backgroundColor: '#F8794A',
    borderRadius: 3,
  },
  userText: {
    marginTop: 8,
    color: '#12342D',
    fontSize: 14,
  },
});

