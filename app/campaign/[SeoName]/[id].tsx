import { URL } from "@/api";
import colors from "@/constants/colors";

import { stripHtmlTags } from "@/helpers";
import useFetch from "@/hooks/useFetch";
import { backSVG } from "@/svg";
import { DetailType } from "@/types/detailType";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

const { height } = Dimensions.get("window");
const IMG_HEIGHT = height * 0.4;

const CampaignDetail = () => {
  const { id } = useLocalSearchParams();
  const { data, loading, refetch } = useFetch<DetailType>(`${URL}/promotions?Id=${id}`);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const item = data ? data : null;
  const router = useRouter();
  const remainingTime = new Date(item?.EndDate ?? "").getTime() - new Date().getTime();
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
              <SvgXml xml={backSVG} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={"blue"} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 150 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: data?.ImageUrl }} style={styles.image} />
              <Image source={{ uri: data?.BrandIconUrl }} style={styles.brandImage} />
              <Text style={styles.remainingDay}>
                Son <Text style={styles.remainingDaysHighlight}>{remainingDays}</Text> gün
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.campaignTitle}>{stripHtmlTags(data?.Title ?? "")}</Text>
              <Text style={styles.campaignDesc}>{stripHtmlTags(data?.Description ?? "")}</Text>
            </View>
          </ScrollView>
        )}
        <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerBtnTxt}>Hemen Katıl</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

export default CampaignDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "#1D1C1E",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: IMG_HEIGHT,
    borderBottomLeftRadius: 130,
  },
  brandImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    left: 10,
    borderWidth: 4,
    borderColor: colors.white,
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
  contentWrapper: {
    padding: 20,
    backgroundColor: colors.white,
  },
  campaignTitle: {
    fontSize: 26,
    fontWeight: "700",
  },
  campaignDesc: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10,
    color: "rgba(29, 30, 28, 1)",
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 15,
    width: "100%",
  },
  footerBtn: {
    flex: 1,
    backgroundColor: "rgba(244, 0, 0, 1)",
    padding: 15,
    borderRadius: 50,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBtnTxt: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});
