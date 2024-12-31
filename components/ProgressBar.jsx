import { View } from "react-native";
import React from "react";

export default function ProgressBar({ value }) {
  return (
    <View
      style={{
        backgroundColor: "#A4D698",
        width: 350,
        borderRadius: 25,
        height: 6,
      }}
    >
      <View
        style={{
          backgroundColor: "#205A13",
          width: `${value}%`,
          height: "100%",
          borderRadius: 25,
        }}
      />
    </View>
  );
}
