import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
const Onboarding = (navigation) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#161716"} barStyle={"light-content"} />
      <View className="flex-1">
        <ProgressSteps
          activeStepIconBorderColor="#205A13"
          completedProgressBarColor="#205A13"
          completedStepIconColor="#205A13"
          activeStepIconColor="#fff"
          disabledStepIconColor="gray"
          labelFontSize={14}
          topOffset={20}
          marginBottom={20}
        >
          <ProgressStep
            label="Main Goal"
            nextBtnText="Next"
            // previousBtnText="Back"
            nextBtnStyle={styles.nextButton}
            previousBtnStyle={styles.previousButton}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnTextStyle={styles.previousButtonText}
          >
            <View>
              <Text>What is Your Main Goal?</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Basic Details"
            nextBtnText="Next"
            previousBtnText="Back"
            nextBtnStyle={styles.nextButton}
            previousBtnStyle={styles.previousButton}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnTextStyle={styles.previousButtonText}
          >
            <Text>Enter your Basic Details</Text>
          </ProgressStep>
          <ProgressStep
            label="Dietary Info"
            nextBtnText="Next"
            nextBtnStyle={styles.nextButton}
            previousBtnStyle={styles.previousButton}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnTextStyle={styles.previousButtonText}
          >
            <Text>Enter your Dietery Information</Text>
          </ProgressStep>
          <ProgressStep
            label="Nutrition Awearenes"
            nextBtnText="Next"
            previousBtnText="Back"
            nextBtnStyle={styles.nextButton}
            previousBtnStyle={styles.previousButton}
            nextBtnTextStyle={styles.nextButtonText}
            previousBtnTextStyle={styles.previousButtonText}
          >
            Rate Your Nutrional Awearenes
          </ProgressStep>
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
};
export default Onboarding;
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: "#205A13",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  previousButton: {
    backgroundColor: "#161716",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  nextButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  previousButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
});
