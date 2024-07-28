import CategoryButtons from "@/components/high-level/CategoryButtons";
import Listings from "@/components/high-level/Listings";
import colors from "@/constants/colors";

import { loginSVG } from "@/svg";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";

const { width } = Dimensions.get("window");

const HeaderLeft = () => (
  <TouchableOpacity onPress={() => {}} style={styles.headerLeft}>
    <Image source={require("@/assets/images/header_logo.png")} style={styles.logo} />
  </TouchableOpacity>
);

const HeaderRight = ({ login, setLogin }: { login: boolean; setLogin: React.Dispatch<React.SetStateAction<boolean>> }) => (
  <View style={styles.headerRight}>
    {!login && (
      <TouchableOpacity onPress={() => setLogin(true)} style={styles.loginButton}>
        <Text style={styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity onPress={() => setLogin((prev) => !prev)} style={[styles.profileButton, login && styles.profileButtonLoggedIn]}>
      <SvgXml xml={loginSVG} width={16} height={17} />
      {login && <View style={styles.greenDot} />}
    </TouchableOpacity>
  </View>
);

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState(0);
  const [login, setLogin] = useState(false);

  const onCatChanged = (category: number) => {
    setCategory(category);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: HeaderLeft,
          headerRight: () => <HeaderRight login={login} setLogin={setLogin} />,
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CategoryButtons onCategoryChanged={onCatChanged} />
          <Listings category={category} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerLeft: {
    marginLeft: 20,
  },
  logo: {
    width: width * 0.23,
    height: width * 0.115,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
  },
  loginButton: {
    marginRight: 10,
    backgroundColor: "rgba(244, 0, 0, 1)",
    paddingHorizontal: width * 0.06,
    height: width * 0.11,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontWeight: "700",
    fontSize: width * 0.03,
    color: "white",
  },
  profileButton: {
    backgroundColor: "rgba(29, 30, 28, 1)",
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    position: "relative",
  },
  profileButtonLoggedIn: {
    backgroundColor: "red",
  },
  greenDot: {
    position: "absolute",
    top: -3,
    right: 3,
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: "white",
  },
  headingTxt: {
    fontSize: width * 0.07,
    fontWeight: "800",
    color: colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
});
