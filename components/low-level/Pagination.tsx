import { StyleSheet, View } from "react-native";
import React from "react";
import Dot from "./Dot";
import { SharedValue } from "react-native-reanimated"; // Import the SharedValue type

interface PaginationProps {
  data: any[];
  x: SharedValue<number>; // Update the type of the x prop
  size: number;
}

const Pagination: React.FC<PaginationProps> = ({ data, x, size }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        const isActive = Math.round(x.value / size) === i;
        return <Dot key={i} x={x} index={i} size={size} active={isActive} color={_.ListButtonTextBackGroudColor} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
