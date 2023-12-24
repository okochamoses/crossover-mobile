import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { McqType } from "../types/types";
import Card from "./Card";
import _Text from "./_Text";

const Mcq: React.FC<McqType & { index: number }> = (props) => {
  const height = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ImageBackground
      key={props.index}
      source={{ uri: props?.image }}
      style={{ ...styles.backgroundImage, height: height - tabBarHeight }}
    >
      <View style={styles.child}>
        <Card {...props}>
          <View style={styles.mcqContainer}>
            <_Text style={{ overflow: "hidden" }}>
              <_Text style={styles.question}>{props?.question}</_Text>
            </_Text>
            <View style={styles.optionsContainer}>
              {props?.options?.map((option) => (
                <TouchableOpacity key={option.id} style={styles.option}>
                  <_Text style={styles.optionText}>{option.answer}</_Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "black",
  },
  mcqContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
    paddingTop: 150,
  },
  question: {
    backgroundColor: "rgba(0,0,0,0.6)",
    fontSize: 26,
  },
  optionsContainer: {
    width: "100%",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 20,
    textShadowColor: "black",
    textShadowOffset: { width: -2, height: -2 },
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default Mcq;
