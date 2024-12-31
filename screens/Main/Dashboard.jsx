import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-[#161716]">
      <StatusBar backgroundColor="#161716" barStyle="light-content" />
      <View className="pt-4">
        <Text className="text-white">
          Dashboard Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptate aspernatur sequi hic cumque reprehenderit harum esse tenetur
          omnis laboriosam, suscipit minima mollitia laborum ducimus molestias
          autem distinctio modi doloribus aliquid!
        </Text>
      </View>
    </SafeAreaView>
  );
}
