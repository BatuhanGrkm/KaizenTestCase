import { StyleSheet } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from "react-native-reanimated";

interface DotProps {
  x: SharedValue<number>;
  index: number;
  size: number;
  active: boolean;
  color: string;
}

const Dot: React.FC<DotProps> = ({ x, index, size, active, color }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(x.value, [(index - 1) * size, index * size, (index + 1) * size], [10, 20, 10], Extrapolation.CLAMP);
    const opacityAnimation = interpolate(x.value, [(index - 1) * size, index * size, (index + 1) * size], [0.5, 1, 0.5], Extrapolation.CLAMP);

    const animatedColor = widthAnimation > 12 ? 1 : 0;

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
      backgroundColor: animatedColor === 1 ? color : "rgba(216, 216, 216, 1)",
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
