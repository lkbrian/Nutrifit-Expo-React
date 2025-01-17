import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import ProgressBar from "../../components/ProgressBar";
import { RetrieveItem } from "../../utils/storage";
import axiosInstance from "../../utils/axiosSetup";

const Nutrition = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user_id = await RetrieveItem("user_id");
      if (!user_id) {
        console.log("missing id");
        return;
      } else {
        data.step = "nutrition";
        console.log(data);
        const res = await axiosInstance.patch(`user_info/${user_id}`, data);
        console.log(res.data.msg || "sucess");
      }
    } catch (error) {
      console.error("Error", error.response?.data?.msg);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("home");
      }, 2000);
    }
  };
  const guidance_needed = [
    { label: "Meal suggestion", value: "Meal suggestion" },
    { label: "Recipe ideas", value: "Recipe ideas" },
    {
      label: "Moderate(regular exercise)",
      value: "Moderate(regular exercise)",
    },
    { label: "Portion control", value: "Portion control" },
    { label: "None", value: "None" },
  ];
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#161716"} barStyle={"light-content"} />
      <View className="pt-[20px]">
        <View className="flex flex-row gap-2 pt-4 items-center">
          <Ionicons
            name="chevron-back-outline"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <ProgressBar value={100} />
        </View>

        <Text className="text-[24px] font-outfitsemibold px-3 py-8">
          Nutrional Awearness
        </Text>
        <View className="p-4 flex gap-6">
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              Rate Your Nutrition Knowledge
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="1 to 10"
                  value={value}
                  maxLength={2}
                  onChangeText={onChange}
                  className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] px-4 font-outfitregular"
                />
              )}
              name="nutrition_knowledge"
              rules={{
                required: "rate is required",
              }}
            />
            {errors.nutrition_knowledge && (
              <Text className="text-red-500 text-xs mb-1">
                {errors.nutrition_knowledge.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              What Kind of guidance are youy looking for?
            </Text>
            <Controller
              control={control}
              name="guidance_needed"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={guidance_needed}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Guidance needed"}
                  value={value}
                  onChange={(item) => {
                    // setValue(item.value);
                    onChange(item.value);
                  }}
                  renderItem={(item) => (
                    <View
                      style={[
                        styles.dropdownItem,
                        item.value === value && { backgroundColor: "#C5E46C" }, // Custom color
                      ]}
                    >
                      <Text>{item.label}</Text>
                    </View>
                  )}
                />
              )}
            />
          </View>
          <View className="w-full flex flex-row justify-between">
            <Pressable
              onPress={() => navigation.goBack()}
              className="rounded-[10px] w-[45%] h-[40px] flex flex-row items-center justify-center gap-4 bg-[#161716]"
            >
              <Text className="text-white text-center text-[16px] font-outfitregular">
                Back
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              className={`w-[45%] h-[40px] flex flex-row items-center justify-center gap-4 ${
                isLoading ? "bg-[#161716]" : "bg-[#205A13]"
              } rounded-[10px] flex justify-center`}
              disabled={isLoading}
            >
              <>
                {isLoading && (
                  <ActivityIndicator size="small" color="#205A13" />
                )}
              </>
              <Text className="text-white text-center text-[16px] font-outfitregular">
                {isLoading ? "Submitting..." : "Finish"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Nutrition;
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#C5E46C",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
    fontFamily: "outfitregular",
  },
  selectedTextStyle: {
    fontFamily: "outfitregular",
    fontSize: 14,
  },
  dropdownItem: {
    padding: 12,
    fontFamily: "outfitregular",
  },
});
