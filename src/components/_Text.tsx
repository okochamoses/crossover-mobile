import React, { FC, ReactNode } from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface _TextProps extends TextProps {
  children: ReactNode;
  bold?: boolean;
}

const _Text: FC<_TextProps> = ({ style, children, bold, ...props }) => (
  <Text
    style={[styles.defaultFont, style, bold ? { fontFamily: "sf-bold" } : {}]}
    {...props}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "sf-regular",
    color: "#fff",
  },
});

export default _Text;
