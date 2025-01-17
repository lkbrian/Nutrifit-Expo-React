import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import React from "react";
import Header from "../../components/Header";

export default function Dashboard() {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#161716" barStyle="light-content" />
      <Header />
    </SafeAreaView>
  );
}
