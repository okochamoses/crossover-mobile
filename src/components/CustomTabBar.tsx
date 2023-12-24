import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
} from "react-native";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavButton } from "./NavButton";
import _Text from "./_Text";

interface TabBarIndicatorProps {
  state: TabNavigationState<ParamListBase>;
  positions: {
    [key: string]: number;
  };
}

const screenWidth = Dimensions.get("screen").width / 2;

const TabBarIndicator: React.FC<TabBarIndicatorProps> = ({
  state,
  positions,
}) => {
  const middle: number = screenWidth / 2;
  const toValue =
    positions[state.routes[state.index].name] == undefined
      ? middle
      : positions[state.routes[state.index].name];
  const translateValue = useRef(new Animated.Value(toValue)).current;

  useEffect(() => {
    Animated.timing(translateValue, {
      toValue: toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [state, positions]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: translateValue }] },
      ]}
    />
  );
};

const CustomTabHandler: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}): React.ReactNode => {
  const [itemPositions, setItemPositions] = useState({});

  return state.routes.map((route: any, index: number) => {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const handleLayout = (event: LayoutChangeEvent) => {
      (event.target as any).measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setItemPositions((prevPositions) => ({
            ...prevPositions,
            [route.name]: x + pageX + (width - 30) / 2,
          }));
        }
      );
    };

    return (
      <React.Fragment key={index}>
        <View style={styles.tabBarButton}>
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLayout={handleLayout}
          >
            <_Text
              bold
              style={{
                color: isFocused ? "#fff" : "rgba(255,255,255,0.6)",
                fontSize: 16,
              }}
            >
              {route.name}
            </_Text>
          </TouchableOpacity>
        </View>
        <TabBarIndicator state={state} positions={itemPositions} />
      </React.Fragment>
    );
  });
};

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds / 60) % 60);
    const seconds = timeInSeconds % 60;
    return `${hours > 0 ? hours + ":" : ""}${
      minutes > 0 ? minutes + "m" : ""
    } ${minutes < 1 ? seconds + "s" : ""}`;
  };

  return (
    <View
      style={{
        marginTop: insets.top,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        zIndex: 10,
        width: "100%",
      }}
    >
      <NavButton
        icon="stopwatch-sharp"
        color="rgba(255,255,255,0.6)"
        justifyContent="flex-start"
      >
        {formatTime(timer)}
      </NavButton>
      <CustomTabHandler {...props} />
      <NavButton
        icon="md-search-sharp"
        color="#fff"
        justifyContent="flex-end"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 30,
    borderBottomColor: "#fff",
    borderBottomWidth: 4,
    bottom: 0,
  },
  tabBarButton: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    padding: 10,
  },
});

export default CustomTabBar;
