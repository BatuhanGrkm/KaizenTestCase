import CustomTabBarButton from "@/components/low-level/CustomTabBarButton";
import TabItem from "@/components/low-level/TabItem";
import colors from "@/constants/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderWidth: 1.5,
          borderColor: "#ECEEEF",
          padding: 0,
          height: height * 0.09,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabItem icon={<Ionicons name="compass" size={28} color={color} />} label="KEŞFET" color={color} />,
        }}
      />
      <Tabs.Screen
        name="custom"
        options={{
          tabBarButton: (props) => <CustomTabBarButton />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <TabItem icon={<FontAwesome name="star" size={28} color={color} />} label="DAHA CÜZDAN" color={color} />,
        }}
      />
    </Tabs>
  );
}
