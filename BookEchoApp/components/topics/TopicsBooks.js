import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
} from 'react-native';
import colors from '../../styles/colors';
import typography from '../../styles/typography';

export default function TopicsBooks({ selectedTopic, setSelectedTopic }) {
    const topics = [
        {
            id: 1,
            name: 'Ficción',
            image: require('../../assets/images/Topics/gift.png'),
            color: colors.NormalTurquoise,
            activeColor: colors.NormalActiveTurquoise,
            subtitle: 'Ficció',
        },
        {
            id: 2,
            name: 'Misterio',
            image: require('../../assets/images/Topics/globe.png'),
            color: colors.NormalOrange,
            activeColor: colors.NormalActiveOrange,
            subtitle: 'Misteri',
        },
        {
            id: 3,
            name: 'Fantasía',
            image: require('../../assets/images/Topics/emoji-happy.png'),
            color: colors.NormalYellow,
            activeColor: colors.NormalActiveYellow,
            subtitle: 'Fantasia',
        },
        {
            id: 4,
            name: 'Ciencia',
            image: require('../../assets/images/Topics/sparkles.png'),
            color: colors.NormalPurple,
            activeColor: colors.NormalActivePurple,
            subtitle: 'Ciencia',
        },
        {
            id: 5,
            name: 'Suspenso',
            image: require('../../assets/images/Topics/eye-off.png'),
            color: colors.NormalGreen,
            activeColor: colors.NormalActiveGreen,
            subtitle: 'Suspens',
        },
        {
            id: 6,
            name: 'Películas',
            image: require('../../assets/images/Topics/film.png'),
            color: colors.NormalRed,
            activeColor: colors.NormalActiveRed,
            subtitle: 'Cinema',
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={[styles.title, typography.H2Bold]}>Topics</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {topics.map((topic) => {
                    const isActive = selectedTopic === topic.name;
                    return (
                        <Pressable
                            key={topic.id}
                            onPress={() =>
                                setSelectedTopic(isActive ? '' : topic.name)
                            }
                            style={({ pressed }) => [
                                styles.topicCard,
                                {
                                    backgroundColor: pressed
                                        ? topic.activeColor
                                        : isActive
                                        ? topic.activeColor
                                        : topic.color,
                                },
                            ]}
                        >
                            <Image
                                source={topic.image}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text
                                style={[
                                    typography.footerSemiBold,
                                    { color: colors.NormalWhite },
                                ]}
                            >
                                {topic.subtitle}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        color: colors.DarkHoverGrey,
        marginBottom: 15,
    },
    topicCard: {
        width: 70,
        height: 70,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        padding: 10,
    },
    image: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
});
