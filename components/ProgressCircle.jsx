import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from "react-native-svg-circular-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProgressCircle = ({ progress }) => {
  return (
    <View style={styles.container}>
      {/* <CircularProgress
        percentage={progress}
        radius={100}
        strokeWidth={8}
        duration={1000}
        color="orange"
        shadowColor="#444"
        bgColor="#161716"
      /> */}

      <AnimatedCircularProgress
        size={150}
        width={8}
        fill={progress}
        tintColor="orange"
        backgroundColor="#444"
        rotation={0}
      />

      <View style={styles.progressInner}>
        <Icon name="fire" size={30} color="orange" style={styles.fireIcon} />
        <Text style={styles.largeText}>234</Text>
        <Text style={styles.smallText}>calories left</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  progressInner: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  fireIcon: {
    marginBottom: 5,
  },
  largeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddd",
  },
  smallText: {
    fontSize: 14,
    color: "#bbb",
  },
});

export default ProgressCircle;
