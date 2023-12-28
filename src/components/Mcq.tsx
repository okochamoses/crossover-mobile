import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  CombinedMcqType,
  McqAnswersType,
  McqCorrectOption,
  McqType,
} from "../types/types";
import Card from "./Card";
import _Text from "./_Text";

const Mcq: React.FC<CombinedMcqType & { index: number }> = (props) => {
  const height = Dimensions.get("window").height;
  const tabBarHeight = useBottomTabBarHeight();
  const [answer, setAnswer] = useState("");
  const [reveal, setReveal] = useState(false);

  const handlePress = (option: any) => {
    setReveal(true);
    setAnswer(option.id);
  };

  const isAnswer = (correctOptions: McqCorrectOption[], option: any) => {
    if (reveal) {
      if (
        correctOptions.find((x) => x.id == option.id) == undefined &&
        option.id == answer
      ) {
        return { backgroundColor: "red" };
      }
      if (correctOptions.find((x) => x.id == option.id) !== undefined) {
        return { backgroundColor: "green" };
      }
    }
    return {};
  };

  const thumb = (correctOptions: McqCorrectOption[], option: any) => {
    if (reveal) {
      if (
        correctOptions.find((x) => x.id == option.id) == undefined &&
        option.id == answer
      ) {
        return (
          <Image
            source={require("../../assets/thumbs_down.gif")}
            height={56}
            width={56}
            style={{ height: 56, width: 56 }}
          />
        );
      }
      if (correctOptions.find((x) => x.id == option.id) !== undefined) {
        return (
          <Image
            source={require("../../assets/thumbs_up.gif")}
            height={56}
            width={56}
            style={{ height: 56, width: 56 }}
          />
        );
      }
    }
    return <></>;
  };

  return (
    <ImageBackground
      key={props.index}
      source={{ uri: props?.mcq.image }}
      style={{ ...styles.backgroundImage, height: height - tabBarHeight }}
    >
      <View style={styles.child}>
        <Card {...props.mcq}>
          <View style={styles.mcqContainer}>
            <_Text style={styles.textWrapper}>
              <_Text style={styles.question}>{props?.mcq.question}</_Text>
            </_Text>
            <View style={styles.optionsContainer}>
              {props?.mcq.options?.map((option) => (
                <TouchableOpacity
                  onPress={() => handlePress(option)}
                  key={option.id}
                  style={[
                    styles.option,
                    isAnswer(props?.ans.correct_options, option),
                  ]}
                >
                  <_Text style={styles.optionText}>{option.answer}</_Text>
                  {thumb(props?.ans.correct_options, option)}
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
    paddingTop: 50,
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    textShadowColor: "black",
    width: "85%",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textWrapper: { overflow: "hidden" },
});

export default Mcq;
