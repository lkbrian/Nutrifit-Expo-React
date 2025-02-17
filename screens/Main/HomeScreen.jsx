import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function HomeScreen() {
  const meals = [
    { name: "Breakfast", current: 274, goal: 460, icon: "food-croissant" },
    { name: "Lunch", current: 300, goal: 350, icon: "food" },
    { name: "Dinner", current: 50, goal: 150, icon: "silverware-fork-knife" },
    { name: "Snacks", current: 100, goal: 100, icon: "hamburger" },
  ];

  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-US");
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.getDate(),
      fullDate: date.toLocaleDateString("en-US"), // We use this for comparison
    };
  });
  const progress = 0.7;
  return (
    <SafeAreaView className="w-full">
      <StatusBar backgroundColor="#161716" barStyle="light-content" />
      <Header />
      <ScrollView className="px-2">
        <View className="bg-[#0D1C0F] rounded-xl p-4 my-4 items-center shadow-md shadow-black">
          <View className="flex-row justify-center items-center space-x-5 gap-2 mb-6">
            <View className="flex-basis-40 max-w-[150px] items-center">
              <ProgressCircle progress={70} />
            </View>
            <View className="flex-1 min-w-[150px]">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-sm">Carbs</Text>
                <Text className="text-gray-400 text-sm">12/140g</Text>
              </View>
              <View className="h-2 w-full bg-[#2A3D26] rounded-3xl mb-4">
                <View className="h-full bg-[#D4A017] rounded-3xl w-1/12" />
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-sm">Proteins</Text>
                <Text className="text-gray-400 text-sm">12/140g</Text>
              </View>
              <View className="h-2 w-full bg-[#2A3D26] rounded-3xl mb-4">
                <View className="h-full bg-[#C57B57] rounded-3xl w-1/12" />
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-sm">Fats</Text>
                <Text className="text-gray-400 text-sm">12/140g</Text>
              </View>
              <View className="h-2 w-full bg-[#2A3D26] rounded-3xl mb-4">
                <View className="h-full bg-[#5C9E3E] rounded-3xl w-3/12" />
              </View>
            </View>
          </View>
          <Text className="text-gray-400 text-xs mt-2">
            Burned: 500kcal | Eaten: 500kcal
          </Text>
        </View>
        <View className="w-full">
          <Text className="text-3xl font-outfitbold text-center my-4 text-[#161716]">
            MEAL INTAKE
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mx-auto"
        >
          {dates.map((date, index) => (
            <Pressable
              key={index}
              className={`flex justify-center items-center py-1 px-4 mx-3 rounded-md ${
                date.fullDate === formattedToday
                  ? "bg-[#15380D] border-0"
                  : "border bg-transparent"
              }`}
            >
              <Text
                className={`${
                  date.fullDate === formattedToday
                    ? "text-[#fff]"
                    : "text-[#161716]"
                }`}
              >
                {date.weekday}
              </Text>
              <Text
                className={` font-outfitbold text-2xl ${
                  date.fullDate === formattedToday
                    ? "text-[#fff]"
                    : "text-[#161716]"
                }`}
              >
                {date.day}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View
          className="rounded-xl mt-4 mx-2 p-3"
          style={{
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
          }}
        >
          {meals.map((meal, index) => {
            const progress = (meal.current / meal.goal) * 100;
            const isLast = index === meals.length - 1;
            return (
              <View
                key={index}
                className={`flex-row items-center p-4 ${
                  !isLast ? "border-b border-gray-300" : ""
                }`}
              >
                <Icon name={meal.icon} size={30} color="#161716" />
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold">{meal.name}</Text>
                  <View className="w-4/5 h-2 bg-gray-300 rounded-xl my-1">
                    <View
                      className={`h-full rounded-xl bg-[#FF952C]`}
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                  <Text className="text-sm text-gray-500">{`${meal.current}/${meal.goal} kcal`}</Text>
                </View>
                <TouchableOpacity className="border border-[#4FA43A] p-2 rounded-full">
                  <Icon name="plus" size={20} color="#4FA43A" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
