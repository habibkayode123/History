import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Hello from "./componet/home";
import History from "./componet/history";
import Purchase from "./componet/purchase";

export type RootStackParamList = {
  Home: undefined;
  History: undefined;``
  Purchase: { purchaseId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Hello}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Purchase" component={Purchase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
