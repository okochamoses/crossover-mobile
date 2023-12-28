import { View } from "react-native";
import React, { PropsWithChildren } from "react";
import _Text from "./_Text";

const FlashCardText: React.FC<PropsWithChildren & { color: string }> = ({
  children,
  color,
}) => {
  return (
    <View style={{}}>
      <_Text style={{ fontSize: 21, color: color }}>{children}</_Text>
    </View>
  );
};

export default FlashCardText;
