import React, { PropsWithChildren } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _Text from "./_Text";

type ActionBarProps = {
  avatar: string | undefined;
  flip: Function | undefined;
};

const ActionBar: React.FC<ActionBarProps> = ({ avatar, flip }) => (
  <View style={styles.container}>
    <ActionIcon name={{ uri: avatar }}>
      <Image
        source={{ uri: avatar }}
        height={45}
        width={45}
        style={styles.image}
      />
      <Image
        source={require("../../assets/add.png")}
        height={10}
        width={10}
        style={{ height: 15, width: 15, marginTop: -8 }}
      />
    </ActionIcon>
    <ActionIcon name={require("../../assets/Vector.png")} text={"87"} />
    <ActionIcon name={require("../../assets/Subtract.png")} text={"2"} />
    <ActionIcon name={require("../../assets/bookmark.png")} text={"203"} />
    <ActionIcon name={require("../../assets/Union.png")} text={"17"} />
    {flip == undefined ? (
      <></>
    ) : (
      <ActionIcon onPress={flip} name="">
        <Image source={require("../../assets/flip.png")} />
      </ActionIcon>
    )}
  </View>
);

type ActionIconProps = {
  name: any;
  text?: string;
  imageUrl?: object | string;
  onPress?: any | undefined;
} & PropsWithChildren;

const ActionIcon: React.FC<ActionIconProps> = ({
  name,
  text,
  onPress,
  children,
}) => (
  <TouchableOpacity style={styles.actionIcon} onPress={onPress}>
    {children ? (
      children
    ) : (
      <View style={{ alignItems: "center" }}>
        <Image source={name} style={{ marginBottom: 5 }} />
        <_Text>{text}</_Text>
      </View>
    )}
  </TouchableOpacity>
);

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
    borderRadius: 45 / 2,
  },
});

export default ActionBar;
