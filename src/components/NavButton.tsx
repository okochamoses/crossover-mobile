import React, { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _Text from "./_Text";

export const NavButton: React.FC<
  PropsWithChildren & {
    icon: any;
    justifyContent: "flex-start" | "flex-end";
    color: string;
  }
> = ({ icon, children, justifyContent, color }) => (
  <TouchableOpacity
    onPress={() => {}}
    style={{
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: justifyContent,
      flex: 1,
    }}
  >
    <Ionicons
      name={icon}
      color={color}
      size={24}
      style={{ marginHorizontal: 2 }}
    />
    <_Text style={{ color: color }}>{children}</_Text>
  </TouchableOpacity>
);
