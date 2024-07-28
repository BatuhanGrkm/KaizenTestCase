import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CategoryType } from "@/types/categoryType";
import colors from "@/constants/colors";

type Props = {
  item: CategoryType;
  index: number;
  activeIndex: number;

  handleSelectCategory: (index: number, category: number) => void;
};

const RenderCategoryButton = ({ item, index, activeIndex, handleSelectCategory }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelectCategory(index, item.Id)}
      style={[styles.categoryBtn, activeIndex === index && styles.categoryBtnActive]}
      delayPressIn={0}
    >
      <Image source={{ uri: item.IconUrl }} style={styles.categoryIcon} />
      <Text style={styles.categoryText}>{item.Name}</Text>
    </TouchableOpacity>
  );
};

export default RenderCategoryButton;

const styles = StyleSheet.create({
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1.5,
    borderColor: "lightgray",
  },
  categoryBtnActive: {
    borderColor: "red",
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  categoryText: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 8,
  },
});
