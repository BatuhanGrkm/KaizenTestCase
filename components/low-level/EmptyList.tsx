import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const EmptyComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("@/assets/images/gif/empty-list.gif")} />
      <Text style={styles.text}>Uygun kampanya bulunamadı</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default EmptyComponent;
