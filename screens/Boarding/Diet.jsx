import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  SafeAreaView,
  StatusBar,
  Text,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Platform,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ProgressBar from "../../components/ProgressBar";
import { Dropdown } from "react-native-element-dropdown";

const dietaryPreferences = [
  { label: "Vegeterian", value: "Vegeterian" },
  { label: "Vegan", value: "Vegan" },
  { label: "Gluten-Free", value: "Gluten-Free" },
  { label: "Dairy-Free", value: "Dairy-Free" },
  { label: "No Preference", value: "No Preference" },
];
const mealsPerDay = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4+", value: "4+" },
];
const dietDescription = [
  { label: "High Protein", value: "High Protein" },
  { label: "Low Carb", value: "Low Carb" },
  { label: "Meditrenean", value: "Meditrenean" },
  { label: "Standard Diet", value: "Standard Diet" },
  { label: "Unhealthy/Takeout often", value: "Unhealthy/Takeout often" },
];
const activityLevels = [
  { label: "Sedentary(Mostly Inactive)", value: "Sedentary(Mostly Inactive)" },
  {
    label: "Light Activity(Walking Occasionally)",
    value: "Light Activity(Walking Occasionally)",
  },
  { label: "Moderate(Regular Exercise)", value: "Moderate(Regular Exercise)" },
  { label: "Active(Daily Workouts)", value: "Active(Daily Workouts)" },
  {
    label: "Highly Active(Intense physical activity)",
    value: "Highly Active(Intense physical activity)",
  },
];

const Diet = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#161716"} barStyle={"light-content"} />
      <View className="">
        <View className="flex flex-row gap-2 pt-4 items-center">
          <Ionicons
            name="chevron-back-outline"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <ProgressBar value={75} />
        </View>

        <Text className="text-[24px] font-outfitsemibold px-3 py-8">
          Dietary Information
        </Text>
        <View className="p-4 flex gap-6">
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              Dietary preferences
            </Text>
            <Controller
              control={control}
              name="dietary_preference"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={dietaryPreferences}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Select your prefernce"}
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
              rules={{
                required: "Dietary prefernce is requred",
              }}
            />
            {errors.dietary_preference && (
              <Text className="text-red-500 text-xs">
                {errors.dietary_preference.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              How many meals do you take per day
            </Text>
            <Controller
              control={control}
              name="meals_per_day"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={mealsPerDay}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Amount of meals"}
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
              rules={{
                required: "Amount of meals is requred",
              }}
            />
            {errors.meals_per_day && (
              <Text className="text-red-500 text-xs">
                {errors.meals_per_day.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              How would you describe your diet
            </Text>
            <Controller
              control={control}
              name="diet_description"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={dietDescription}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Describe your diet"}
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
              rules={{
                required: "Dietary description is requred",
              }}
            />
            {errors.diet_description && (
              <Text className="text-red-500 text-xs">
                {errors.diet_description.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="text-[16px] font-outfitregular px-2">
              What is your activity level
            </Text>
            <Controller
              control={control}
              name="activity_levels"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={styles.dropdown}
                  data={activityLevels}
                  maxHeight={300}
                  labelField="label"
                  selectedTextStyle={styles.selectedTextStyle}
                  valueField="value"
                  placeholder={"Select your prefernce"}
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
              rules={{
                required: "Activity levels is requred",
              }}
            />
            {errors.activity_levels && (
              <Text className="text-red-500 text-xs">
                {errors.activity_levels.message}
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
export default Diet;
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
