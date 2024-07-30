import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = scale.value + 0.1;
  };

  // If we uncomment useAnimatedStyle it wont deadlock
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));

  return (
  <SafeAreaView>
      <Animated.View
        style={[{
          width: 100,
          height: 100,
          backgroundColor: 'violet',
        }, animatedStyles]}
      />
      <Button onPress={handlePress} title="Click me" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});