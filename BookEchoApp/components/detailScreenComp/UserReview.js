import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';
import IconButton from '../buttons/iconbutton';
import { Ionicons } from '@expo/vector-icons';
import Overlay from '../overlays&popups/Overlay';

const UserReviewCard = ({ rating, title, content, date, userName, userImageUri, reviewId, onDelete, }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>

      <View style={styles.userRow}>
        <View style={styles.userInfoLeft}>
          {userImageUri ? (
            <Image source={{ uri: userImageUri }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={30} color={colors.NormalGrey} />
          )}

          <Text style={[typography.labelSemiBold, { marginLeft: 12, color: colors.NormalGrey }]}>
            {userName || 'Usuari'}
          </Text>

          <Ionicons name="star" size={16} color={colors.NormalYellow} style={{ marginLeft: 12 }} />
          <Text style={[typography.labelSemiBold, { color: colors.NormalGrey, marginLeft: 4 }]}>
            {rating}
          </Text>
        </View>

        <Overlay
          style={[styles.overlay, typography.subtitleRegular]}
          contentType="ReviewOptions"
          reviewId={reviewId}
          library={"MaterialCommunityIcons"}
          icon={"dots-vertical"}
          onDelete={onDelete}
        />
      </View>


      <Text style={[typography.H3Bold, { color: colors.DarkGrey, marginTop: 10 }]}>
        {title}
      </Text>

      <Text
        style={[typography.bodyMedium, { color: colors.NormalGrey, marginTop: 10 }]}
        numberOfLines={expanded ? undefined : 3}
      >
        {content}
      </Text>

      {content.length > 35 && (
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
    color: colors.DarkTurquoise,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserReviewCard;