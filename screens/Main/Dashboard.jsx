import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const meals = [
    { name: "Breakfast", current: 274, goal: 460, icon: "food-croissant" },
    { name: "Lunch", current: 300, goal: 350, icon: "food" },
    { name: "Dinner", current: 50, goal: 150, icon: "silverware-fork-knife" },
    { name: "Snacks", current: 100, goal: 100, icon: "hamburger" },
  ];

  const today = new Date();
  const formattedToday = `${today.toLocaleDateString("en-US", {
    weekday: "short",
  })} ${today.getDate()}`;

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return `${date.toLocaleDateString("en-US", {
      weekday: "short",
    })} ${date.getDate()}`;
  });
  const progress = 0.7;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#161716" barStyle="light-content" />
      <Header />
      <ScrollView>
        {/* Calorie Card */}
        <View style={styles.calorieCard}>
          <View style={styles.contentRow}>
            <View style={styles.progressCircleContainer}>
              <ProgressCircle progress={70} />
            </View>

            <View style={styles.nutrients}>
              <View style={styles.nutrientRow}>
                <Text style={styles.nutrientText}>Carbs</Text>
                <Text style={styles.nutrientAmount}>12/140g</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, styles.carbs]} />
              </View>

              <View style={styles.nutrientRow}>
                <Text style={styles.nutrientText}>Proteins</Text>
                <Text style={styles.nutrientAmount}>12/140g</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, styles.proteins]} />
              </View>

              <View style={styles.nutrientRow}>
                <Text style={styles.nutrientText}>Fats</Text>
                <Text style={styles.nutrientAmount}>12/140g</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, styles.fats]} />
              </View>
            </View>
          </View>

          <Text style={styles.subTexting}>
            Burned: 500kcal | Eaten: 500kcal
          </Text>
        </View>

        {/* Date Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((day, index) => (
            <TouchableOpacity key={index} style={styles.dateItem}>
              <Text
                style={[
                  styles.dateText,
                  day === formattedToday ? styles.activeDate : {},
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Meal Intake Section */}
        <View>
          <Text style={styles.sectionTitle}>MEAL INTAKE</Text>
          {meals.map((meal, index) => {
            const progress = (meal.current / meal.goal) * 100;

            return (
              <View key={index} style={styles.mealRow}>
                <Icon name={meal.icon} size={30} color="#161716" />
                <View style={styles.mealDetails}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <View style={styles.mealProgressBarContainer}>
                    <View style={[styles.mealBar, { width: `${progress}%` }]} />
                  </View>
                  <Text
                    style={styles.mealCalories}
                  >{`${meal.current}/${meal.goal} kcal`}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Icon name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 50,
    overflowY: "hidden",
  },

  calorieCard: {
    backgroundColor: "#0D1C0F",
    borderRadius: 12,
    padding: 5,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  contentRow: {
    flex: 1,
    flexDirection: "row",
    //flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    rowGap: 15,
  },

  progressCircleContainer: {
    flexBasis: "40%",
    maxWidth: 150,
    alignItems: "center",
  },

  subTexting: {
    alignItems: "left !important",
    fontSize: 12,
    color: "#ccc",
    marginTop: 10,
  },
  nutrients: {
    flex: 1,
    minWidth: 150,
  },
  nutrientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nutrientText: {
    color: "#fff",
    fontSize: 14,
  },
  nutrientAmount: {
    color: "#ccc",
    fontSize: 14,
  },
  progressBarContainer: {
    height: 6,
    width: "100%",
    backgroundColor: "#2A3D26",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },

  carbs: { backgroundColor: "#D4A017", width: "8%" },
  proteins: { backgroundColor: "#C57B57", width: "8%" },
  fats: { backgroundColor: "#5C9E3E", width: "8%" },

  largeText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 16,
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#aaa",
  },

  dateItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  dateText: {
    fontSize: 16,
    color: "#161716",
  },
  activeDate: {
    fontWeight: "bold",
    color: "orange",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    color: "#161716",
  },

  mealRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    margin: 5,
    borderRadius: 8,
  },
  mealDetails: {
    flex: 1,
    marginLeft: 10,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  mealProgressBarContainer: {
    width: "80%",
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 6,
  },
  mealBar: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 4,
  },
  mealCalories: {
    fontSize: 14,
    color: "#888",
  },
  addButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 50,
  },
});
