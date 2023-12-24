import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { PropsWithChildren } from "react";
import ActionBar from "./ActionBar";
import { FlashcardType } from "../types/types";
import _Text from "./_Text";
import PlayListBar from "./PlayListBar";

const Card: React.FC<FlashcardType & PropsWithChildren> = ({
  author,
  authorAvatar,
  description,
  playlist,
  children,
}) => (
  <>
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          {children}
        </View>
        <CardInfo topic={author} description={description} />
      </View>
      <View style={{ justifyContent: "flex-end", height: "100%" }}>
        <ActionBar avatar={authorAvatar} />
      </View>
    </SafeAreaView>
    <PlayListBar>{playlist}</PlayListBar>
  </>
);

const CardInfo: React.FC<any> = ({ topic, description }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
      }}
    >
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
});

export default Card;
