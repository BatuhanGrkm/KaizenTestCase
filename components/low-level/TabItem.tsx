import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, color }) => (
  <View style={styles.tabItem}>
    {icon}
    <Text style={[styles.tabLabel, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 0.5,
  },
});

export default TabItem;
