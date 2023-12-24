import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View, SafeAreaView } from "react-native";
import _Text from "../components/_Text";

const DummyScreen: React.ComponentType<{
  route: RouteProp<any>;
  navigation: any;
}> = ({ route }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <_Text>{route.name} Screen</_Text>
    </View>
  </SafeAreaView>
);

export default DummyScreen;
