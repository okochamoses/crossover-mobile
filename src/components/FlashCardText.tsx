import { View } from "react-native";
import React, { PropsWithChildren } from "react";
import _Text from "./_Text";

const FlashCardText: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={{ marginHorizontal: 16 }}>
      <_Text style={{ fontSize: 21 }}>{children} hsjdhs</_Text>
    </View>
  );
};

export default FlashCardText;
