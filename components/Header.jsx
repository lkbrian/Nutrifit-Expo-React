import { View, Text, Image } from "react-native";
import React from "react";

export default function Header() {
  const date = new Date();

  return (
    <View className="p-2 pt-4">
      <View className="flex-row justify-between px-2">
        <View className="">
          <Text>Amira yusuf</Text>
          <Text className="font-outfitsemibold text-[18px]">
            {date.toDateString()}
          </Text>
        </View>
        <View className="flex flex-row gap-4">
          <View className="flex-row items-center justify-center">
            <View className="w-8 h-8 justify-center  items-center">
              <Image
                source={require("../assets/images/flame.png")}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
            </View>
            <Text className="font-outfitsemibold text-[16px] pt-2">2 Days</Text>
          </View>
          <View className="w-12 h-12 rounded-full overflow-hidden justify-center items-center bg-[rgba(197,228,108)]">
            <Image
              source={require("../assets/images/profile.jpeg")}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
