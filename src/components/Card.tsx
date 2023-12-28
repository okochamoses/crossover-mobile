import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import React, { PropsWithChildren } from "react";
import ActionBar from "./ActionBar";
import { FlashcardType } from "../types/types";
import _Text from "./_Text";
import PlayListBar from "./PlayListBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Card: React.FC<
  FlashcardType & PropsWithChildren & { onFlip?: Function }
> = ({ author, authorAvatar, description, playlist, children, onFlip }) => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <SafeAreaView style={[styles.container, { marginTop: top + 80 }]}>
        <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
          <View style={styles.contentContainer}>{children}</View>
          <CardInfo topic={author} description={description} />
        </View>
        <View style={styles.actionBarContainer}>
          <ActionBar avatar={authorAvatar} flip={onFlip} />
        </View>
      </SafeAreaView>
      <PlayListBar>{playlist}</PlayListBar>
    </>
  );
};

const CardInfo: React.FC<any> = ({ topic, description }) => {
  return (
    <View style={styles.cardInfoContainer}>
      <_Text style={styles.username} bold>
        {topic}
      </_Text>
      <_Text style={{ fontSize: 16 }}>{description}</_Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  username: {
    fontWeight: "600",
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingLeft: 20,
  },
  actionBarContainer: {
    justifyContent: "flex-end",
    height: "100%",
  },
  cardInfoContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
  },
});

export default Card;
