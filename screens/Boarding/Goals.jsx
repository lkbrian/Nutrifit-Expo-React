import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../../components/ProgressBar";
import axiosInstance from "../../utils/axiosSetup";

const Goals = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const goals = [
    "Balanced Nutrition",
    "Lose Weight",
    "Gain Weight",
    "Maintainance",
  ];
  const [active, setActive] = useState("Balanced Nutrition");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    console.log(active);
    setIsLoading(true);

    try {
      // const res = await axiosInstance.post()
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("details");
      }, 2000);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#161716"} barStyle={"light-content"} />
      <View className="">
        <View className="flex flex-row gap-2 pt-4 items-center">
          <Ionicons name="chevron-back-outline" size={30} color="#161716" />
          <ProgressBar value={25} />
        </View>
        <Text className="text-[24px] font-outfitsemibold px-3 py-8">
          What is your main goal?
        </Text>
        <View className="p-4 flex gap-4">
          {goals.map((goal, index) => (
            <Pressable
              key={index}
              value={goal}
              onPress={() => setActive(goal)}
              className={`h-[55px] rounded-[10px] flex flex-row items-center px-4 w-full border border-[#C5E46C] ${
                goal === active ? "bg-[#C5E46C]" : "bg-white"
              }`}
            >
              <Text className="text-[16px] font-outfitregular">{goal}</Text>
            </Pressable>
          ))}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className={`mx-auto w-full h-[40px] flex flex-row items-center justify-center gap-4 ${
              isLoading ? "bg-[#161716]" : "bg-[#205A13]"
            } rounded-[10px] flex justify-center`}
            disabled={isLoading}
          >
            <>
              {isLoading && <ActivityIndicator size="small" color="#205A13" />}
            </>
            <Text className="text-white text-center text-[16px] font-outfitregular">
              {isLoading ? "Submitting..." : "Next"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Goals;
