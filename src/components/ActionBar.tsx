import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _Text from "./_Text";

type ActionBarProps = {
  avatar: string | undefined;
};

const ActionBar: React.FC<ActionBarProps> = ({ avatar }) => (
  <View style={styles.container}>
    <ActionIcon imageUrl={avatar} />
    <ActionIcon name="heart" text={"87"} />
    <ActionIcon name="chatbubble-ellipses-sharp" text={"2"} />
    <ActionIcon name="bookmark" text={"203"} />
    <ActionIcon name="md-arrow-redo-sharp" text={"17"} />
  </View>
);

type ActionIconProps = {
  name?:
    | "heart"
    | "chatbubble-ellipses-sharp"
    | "bookmark"
    | "md-arrow-redo-sharp";
  text?: string;
  imageUrl?: string;
};

const ActionIcon: React.FC<ActionIconProps> = ({ name, text, imageUrl }) => {
  const renderData = (imageUrl: string) => {
    if (imageUrl) {
      return (
        <Image
          source={require("../../assets/add.png")}
          height={10}
          width={10}
          style={{ height: 15, width: 15, marginTop: -8 }}
        />
      );
    } else {
      return <_Text>{text}</_Text>;
    }
  };

  return (
    <TouchableOpacity style={styles.actionIcon}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          height={40}
          width={40}
          style={styles.image}
        />
      ) : (
        <Ionicons name={name} size={35} color="#fff" />
      )}
      {renderData(imageUrl!!)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 45,
    margin: 10,
  },
  actionIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
  },
});

export default ActionBar;
