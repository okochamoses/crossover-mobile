import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Card from "./Card";
import FlashCardText from "./FlashCardText";
import { FlashcardType } from "../types/types";
import _Text from "./_Text";
import FlashCardAnswer from "./FlashCardAnswer";

const FlashCard: React.FC<FlashcardType & { index: number }> = (props) => {
  const [isFlipped, setisFlipped] = useState(false);
  const height = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();

  const onFlip = () => {
    setisFlipped(!isFlipped);
  };

  return (
    <LinearGradient
      key={props.id}
      colors={["#001D28", "#00425A"]}
      style={{ flex: 1, height: height - tabBarHeight }}
    >
      <Card {...props} onFlip={onFlip}>
        <FlashCardText color="#fff">{props.question}</FlashCardText>
        {isFlipped ? <FlashCardAnswer>{props.answer}</FlashCardAnswer> : <></>}
      </Card>
    </LinearGradient>
  );
};

export default FlashCard;
