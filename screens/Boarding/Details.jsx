import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Pressable,
  Platform,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "../../components/ProgressBar";
import { Controller, set, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { RetrieveItem } from "../../utils/storage";
import axiosInstance from "../../utils/axiosSetup";
import DatePicker from "react-native-date-picker";

const data = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

const Details = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [value, setValue] = useState(null);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const toggleHeightUnit = () => {
    setHeightUnit((prev) => (prev === "cm" ? "inches" : "cm"));
  };

  const toggleWeightUnit = () => {
    setWeightUnit((prev) => (prev === "kg" ? "lbs" : "kg"));
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user_id = await RetrieveItem("user_id");
      if (!user_id) {
        console.log("missing id");
        return;
      } else {
        data.step = "details";
        console.log(data);
        const res = await axiosInstance.patch(`user_info/${user_id}`, data);
        console.log(res.data.msg || "sucess");
        reset();
      }
    } catch (error) {
      console.error("Error", error.response?.data?.msg);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("diet");
      }, 2000);
    }
  };
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
          <ProgressBar value={50} />
        </View>

        <Text className="text-[24px] font-outfitsemibold px-3 py-8">
          Basic Details
        </Text>
        <View className="p-4 flex gap-8">
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              Date of Birth
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="w-full h-[55px] border border-[#C5E46C] bg-white flex justify-between items-center px-2 flex-row rounded-[10px]"
            >
              <Text className="font-outfitregular">
                {date ? date?.toDateString() : "Select date of birth"}
              </Text>
              <Ionicons size={25} name="calendar-clear-outline" />
            </Pressable>
            <Controller
              control={control}
              name="dob"
              defaultValue={date} // Provide a default value
              render={({ field: { onChange, value } }) => (
                <>
                  {showDatePicker && (
                    <DatePicker
                      value={value || new Date()} // Fallback to `date` if `value` is undefined
                      mode="date"
                      display={Platform.OS === "ios" ? "inline" : "default"}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          onChange(selectedDate); // Update form field
                          setDate(selectedDate); // Update state
                        }
                      }}
                      maximumDate={new Date()}
                    />
                  )}
                </>
              )}
              rules={{
                required: "Date of birth is required",
              }}
            />

            {errors.dob && (
              <Text className="text-red-500 text-xs">{errors.dob.message}</Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              Select Gender
            </Text>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Gender"}
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
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
              rules={{
                required: "Gender is requred",
              }}
            />
            {errors.gender && (
              <Text className="text-red-500 text-xs">
                {errors.gender.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">Height</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Enter height in cm"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] px-4 font-outfitregular"
                />
              )}
              name="height"
              rules={{
                required: "height is required",
              }}
            />
            {errors.height && (
              <Text className="text-red-500 text-xs mb-1">
                {errors.height.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">Weight</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <View className="border-[1px] border-[#C5E46C] bg-white rounded-md h-[50px] px-2 flex-row justify-between items-center">
                  <TextInput
                    placeholder={
                      weightUnit === "kg"
                        ? "Enter weight in kgs"
                        : "Enter weight in pounds"
                    }
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    className="font-outfitregular w-[80%]"
                  />
                  {/* <Text
                    onPress={toggleWeightUnit}
                    className="ml-2 w-6 text-[#205A13] font-outfitregular"
                  >
                    {weightUnit}
                  </Text> */}
                </View>
              )}
              name="weight"
              rules={{
                required: "weight is required",
              }}
            />
            {errors.weight && (
              <Text className="text-red-500 text-xs mb-1">
                {errors.weight.message}
              </Text>
            )}
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
                {isLoading ? "Submitting..." : "Next"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Details;
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
