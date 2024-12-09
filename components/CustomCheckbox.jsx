import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Import the icon for tick mark

const CustomCheckbox = ({ label, onChange, checked }) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      className="flex-row items-center mb-3 gap-2 w-[368px] mx-auto"
    >
      {/* Checkbox */}
      <View
        className={`w-6 h-6 border-2 rounded-sm mr-2 bg-white ${
          checked ? "bg-[#fff] border-[#C5E46C]" : "border-[#C5E46C]"
        } flex justify-center items-center`}
      >
        {checked && <Icon name="check" size={18} color="#C5e46c" />}
      </View>

      {/* Label Text */}
      <Text className="text-lg text-[#161716] font-outfitregular">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
