import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Footer = ({ activeTab }) => {
  const navigation = useNavigation();

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Progress", icon: "chart-line" },
    { name: "Suggestions", icon: "lightbulb" },
    { name: "Recipe", icon: "book-open" },
    { name: "Profile", icon: "account" },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navItem}
          onPress={() => navigation.navigate(tab.name)}
        >
          <Icon
            name={tab.icon}
            size={30}
            color={activeTab === tab.name ? "#4caf50" : "#161716"} // Highlight active tab
          />
          <Text
            style={{ color: activeTab === tab.name ? "#4caf50" : "#161716" }}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",

    // flexDirection: "row",
    // justifyContent: "space-around",
    // padding: 10,
    // borderTopWidth: 1,
    // borderColor: "#ddd",
    // backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
});

export default Footer;
