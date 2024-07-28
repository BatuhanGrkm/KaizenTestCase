import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import MySvgComponent from "./Svg";
import { customBottomSvg } from "@/svg";

const { width, height } = Dimensions.get("window");

interface CustomTabBarButtonProps {
  onPress?: () => void;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = (props) => (
  <View style={styles.customButtonWrapper}>
    <Pressable style={styles.customButton} onPress={props.onPress}>
      <MySvgComponent svgMarkup={customBottomSvg} />
      <Image source={require("@/assets/images/Plus_Vector.png")} style={styles.image} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  customButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  image: {
    position: "absolute",
    width: width * 0.1,
    height: height * 0.05,
  },
  customButton: {
    width: 62,
    height: 62,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  customButtonImage: {
    width: width * 0.1,
    height: height * 0.05,
  },
});

export default CustomTabBarButton;
