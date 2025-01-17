import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-[#c5e4c6bd] flex items-center justify-center">
      <ActivityIndicator size="large" color="#000" />
      {message && <Text className="mt-4 text-black text-lg">{message}</Text>}
    </View>
  );
};
export default LoadingScreen;
