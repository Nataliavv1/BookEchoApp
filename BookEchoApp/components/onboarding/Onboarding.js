import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';

import slides from './slides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';

export default function Onboarding({ navigation }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
  
    const viewableItemsChanged = useRef(({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index);
    }).current;
  
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  
    const handleFinish = () => {
      navigation.replace('Welcome');
    };
  
    return (
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item, index }) => (
            <OnboardingItem
              item={item}
              isLastSlide={index === slides.length - 1}
              onFinish={handleFinish}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={slides} scrollX={scrollX} />
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
