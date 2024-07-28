import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Animated, { useAnimatedStyle, interpolate, SharedValue } from "react-native-reanimated";
import { calculateRemainingDays, stripHtmlTags } from "@/helpers";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";

interface CustomImageProps {
  item: {
    key: string;
    ImageUrl?: string;
    Description?: string;
    [key: string]: any;
  };
  x: SharedValue<number>;
  index: number;
  size: number;
  spacer: number;
}

const ListItem: React.FC<CustomImageProps> = ({ item, x, index, size, spacer }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const router = useRouter();

  // Get Image Width and Height to Calculate AspectRatio
  useLayoutEffect(() => {
    if (item.ImageUrl) {
      Image.getSize(item.ImageUrl, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [item.ImageUrl]);

  const style = useAnimatedStyle(() => {
    const scale = interpolate(x.value, [(index - 2) * size, (index - 1) * size, index * size], [0.8, 0.9, 0.8]);
    return {
      transform: [{ scale }],
    };
  });

  if (!item.ImageUrl) {
    return <View style={{ width: spacer }} />;
  }

  // Calculate remaining days

  const remainingDays = Math.max(calculateRemainingDays(item.RemainingText), 0);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          width: size,
        },
      ]}
    >
      <TouchableOpacity onPress={() => router.navigate(`/campaign/${item.seoName}/${item.Id}`)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.ImageUrl }} style={[styles.image, { aspectRatio }]} />
          <Image source={{ uri: item?.BrandIconUrl }} style={styles.brandImage} />
          <Text style={styles.remainingDay}>
            Son <Text style={styles.remainingDaysHighlight}>{remainingDays}</Text> gün
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>{stripHtmlTags(item.Title)}</Text>
          <Text style={[styles.moreInfo]}>{stripHtmlTags(item?.ListButtonText)}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#F4F6F5",
    borderRadius: 16,
    position: "relative",
  },
  imageContainer: {},
  brandImage: {
    width: 65,
    height: 65,
    borderRadius: 55,
    position: "absolute",
    bottom: 0,
    left: 10,
    borderWidth: 6,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  image: {
    borderRadius: 16,
    borderBottomLeftRadius: 120,
    objectFit: "cover",
  },
  remainingDay: {
    position: "absolute",
    bottom: 12,
    right: 10,
    color: colors.white,
    backgroundColor: "rgba(29, 30, 28, 1)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 50,
    fontSize: 12,
    fontWeight: "400",
  },
  remainingDaysHighlight: {
    fontSize: 14,
  },
  descriptionContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: 34,
    padding: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    marginTop: 5,
  },
  moreInfo: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
  },
});
