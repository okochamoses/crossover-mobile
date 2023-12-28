import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";
import FlashCardText from "./FlashCardText";
import _Text from "./_Text";
import Rating from "./Rating";

const FlashCardAnswer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View>
      <View
        style={{
          marginVertical: 20,
          borderBottomColor: "grey",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <ScrollView>
        <_Text
          style={{ color: "#2DC59F", fontSize: 13, marginBottom: 10 }}
          bold
        >
          Answer
        </_Text>
        <FlashCardText color="rgba(255, 255, 255, 0.7)">
          {children}
        </FlashCardText>
        <_Text
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            paddingVertical: 5,
            marginTop: 30,
          }}
        >
          How well did you know this?
        </_Text>
        <Rating />
      </ScrollView>
    </View>
  );
};

export default FlashCardAnswer;
