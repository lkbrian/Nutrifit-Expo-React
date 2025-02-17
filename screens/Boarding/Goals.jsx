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
import { RetrieveItem } from "../../utils/storage";

const Goals = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const Goals = [
    "Balanced Nutrition",
    "Lose Weight",
    "Gain Weight",
    "Maintainance",
  ];
  const [goals, setGoals] = useState("Balanced Nutrition");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const user_id = await RetrieveItem("user_id");
    const data = { goals, user_id };
    data.step = "goals";
    console.log({ data });

    try {
      const res = await axiosInstance.post("/user_info", data);
      console.log(res.data.msg);
    } catch (error) {
      console.error("Error", error.response?.data?.msg);
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
      <View className="pt-[20px]">
        <View className="flex flex-row gap-2 pt-4 items-center">
          <Ionicons name="chevron-back-outline" size={30} color="#161716" />
          <ProgressBar value={25} />
        </View>
        <Text className="text-[24px] font-outfitsemibold px-3 py-8">
          What is your main goal?
        </Text>
        <View className="p-4 flex gap-4">
          {/* {Goals.map((goal, index) => (
            <Pressable
              key={index}
              value={goal}
              onPress={() => setGoals(goal)}
              className={`h-[55px] rounded-[10px] flex flex-row items-center px-4 w-full border border-[#C5E46C] ${
                goal === goals ? "bg-[#C5E46C]" : "bg-white"
              }`}
            >
              <Text className="text-[16px] font-outfitregular">{goal}</Text>
            </Pressable>
          ))} */}
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
