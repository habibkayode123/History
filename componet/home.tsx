import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Hello: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Purchase History"
        onPress={() => {
          navigation.navigate("History");
        }}
      />
    </View>
  );
};

// styles

export default Hello;
