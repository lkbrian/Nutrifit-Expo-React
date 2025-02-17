import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProgressCircle = ({ progress }) => {
  const totalCalories = 500;
  const caloriesLeft = totalCalories * (1 - progress / 100);

  return (
    <View className="items-center justify-center mt-5">
      <AnimatedCircularProgress
        size={150}
        width={8}
        fill={progress}
        tintColor="#FF952C"
        backgroundColor="#444"
        rotation={0}
      />
      <View className="absolute items-center justify-center w-full h-full">
        <Icon name="fire" size={30} color="orange" className="mb-1" />
        <Text className="text-2xl font-bold text-gray-300">
          {Math.round(caloriesLeft)}
        </Text>
        <Text className="text-sm text-gray-500">calories left</Text>
      </View>
    </View>
  );
};
export default ProgressCircle;
