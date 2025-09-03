import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ClassOverviewScreen from "./screens/ClassOverviewScreen";
import StudentDetailScreen from "./screens/StudentDetailScreen";
import "../global.css"

import type { RootStackParamList } from "./types/navigation";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="ClassOverview"
        screenOptions={{
          headerStyle: { backgroundColor: "#63A7C9" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18, color: "#FFFFFF" },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#F9FAFB" },
        }}
      >
        <Stack.Screen
          name="ClassOverview"
          component={ClassOverviewScreen}
          options={{
            title: "Class Performance",
            headerLargeTitle: false,
          }}
        />

        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={({ route }) => ({
            title: "Student Details",
            headerBackTitle: "Back",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}