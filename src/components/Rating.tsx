import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import _Text from "./_Text";

const Rating = () => (
  <View style={styles.container}>
    <RatingButton color="#F17D23">1</RatingButton>
    <RatingButton color="#FBB668">2</RatingButton>
    <RatingButton color="#FFD449">3</RatingButton>
    <RatingButton color="#16624F">4</RatingButton>
    <RatingButton color="#1F8A70">5</RatingButton>
  </View>
);

const RatingButton: React.FC<PropsWithChildren & { color: string }> = ({
  color,
  children,
}) => (
  <View style={[styles.ratingButton, { backgroundColor: color }]}>
    <_Text>{children}</_Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingButton: {
    backgroundColor: "#1F8A70",
    height: 50,
    width: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Rating;
