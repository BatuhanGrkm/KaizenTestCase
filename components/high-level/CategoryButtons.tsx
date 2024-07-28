import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { URL } from "@/api";
import useFetch from "@/hooks/useFetch";
import { CategoryType } from "@/types/categoryType";
import { FontAwesome5 } from "@expo/vector-icons";
import RenderCategoryButton from "../low-level/CategoryButton";
import colors from "@/constants/colors";

const { width } = Dimensions.get("window");

type Props = {
  onCategoryChanged: (category: number) => void;
};

const CategoryButtons = ({ onCategoryChanged }: Props) => {
  const { data } = useFetch<CategoryType[]>(`${URL}/tags/list?Channel=PWA`);
  const [activeIndex, setActiveIndex] = useState(0); // Aktif kategorinin indeksini tutar
  const scrollViewRef = useRef<ScrollView>(null); // ScrollView referansı

  const handleSelectCategory = (index: number, Id: number) => {
    setActiveIndex(index); // Aktif kategoriyi günceller
    onCategoryChanged(Id); // Kategori değişikliğini bildirir

    // Kategori seçildiğinde scroll işlemi
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * (width * 0.27), animated: true });
    }
  };

  const handleSelectFixedCategory = () => {
    setActiveIndex(-1); // Sabit kategoriyi aktif yapar
    onCategoryChanged(0); // Sabit kategori id'sini bildirir
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectFixedCategory} style={[styles.fixedCategoryBtn, activeIndex === -1 && styles.categoryBtnActive]}>
        <View style={styles.fixedCategoryIconContainer}>
          <FontAwesome5 name="search" size={12} color="white" />
        </View>
        <Text style={styles.fixedCategoryText}>Fırsat Bul</Text>
      </TouchableOpacity>
      <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {data?.map((item, index) => (
          <RenderCategoryButton key={index} item={item} index={index} activeIndex={activeIndex} handleSelectCategory={handleSelectCategory} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  fixedCategoryBtn: {
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
    marginRight: 8,
    marginBottom: 10,
  },
  categoryBtnActive: {
    borderColor: "red",
  },
  fixedCategoryIconContainer: {
    backgroundColor: "rgba(244, 0, 0, 1)",
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  fixedCategoryText: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
  },
  scrollViewContent: {
    gap: 8,
    paddingVertical: 10,
    marginBottom: 10,
  },
});
