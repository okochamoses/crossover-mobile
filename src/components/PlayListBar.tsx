import React, { PropsWithChildren } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _Text from "./_Text";

const PlayListBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Image source={require("../../assets/playlist.png")} />
        <_Text style={styles.playlistText} bold={true}>
          Playlist • Unit 5: {children}
        </_Text>
      </View>
      <Ionicons name="chevron-forward" size={17} color={"#fff"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  playlistText: {
    paddingLeft: 5,
  },
});

export default PlayListBar;
