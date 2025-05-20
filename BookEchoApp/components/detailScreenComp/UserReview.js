import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import { Ionicons } from '@expo/vector-icons';

const UserReviewCard = ({ rating, title, content, date }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={20} color={colors.NormalYellow} />
        <Text style={[typography.H3Regular, { color: colors.NormalGrey, marginLeft: 4 }]}>
          {rating}
        </Text>
      </View>

      <Text style={[typography.H3Bold, { color: colors.DarkerGrey, marginTop: 10 }]}>
        {title}
      </Text>

      <Text
        style={[typography.bodyMedium, { color: colors.NormalGrey, marginTop: 10 }]}
        numberOfLines={expanded ? undefined : 3}
      >
        {content}
      </Text>

      {content.length > 15 && (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={[typography.labelRegular, styles.veureMes]}>
            {expanded ? 'Veure menys' : 'Veure més'}
          </Text>
        </TouchableOpacity>
      )}

      {date && (
        <Text style={[typography.labelRegular, { color: colors.NormalGrey, marginTop: 10 }]}>
          {date}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
    paddingVertical: 16,
    paddingHorizontal: 29,
    backgroundColor: colors.LightGreen,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  veureMes: {
    marginTop: 6,
    color: colors.DarkerTurquoise,
  },
});

export default UserReviewCard;