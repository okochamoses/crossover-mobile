import { Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Card from "./Card";
import FlashCardText from "./FlashCardText";
import { FlashcardType } from "../types/types";
import _Text from "./_Text";

const FlashCard: React.FC<FlashcardType & { index: number }> = (props) => {
  const height = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();
  console.log("INDEX " + props.index + "  " + props.id);

  return (
    <LinearGradient
      key={props.id}
      colors={["#001D28", "#00425A"]}
      style={{ flex: 1, height: height - tabBarHeight }}
    >
      <Card {...props}>
        <FlashCardText>{props.question}</FlashCardText>
      </Card>
    </LinearGradient>
  );
};

export default FlashCard;
