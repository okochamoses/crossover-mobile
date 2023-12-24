import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import * as Font from "expo-font";

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "sf-regular": require("./assets/fonts/SF-Pro-Rounded-Regular.otf"),
        "sf-bold": require("./assets/fonts/SF-Pro-Rounded-Semibold.otf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <View style={styles.container}>
          <MainTabNavigator />
        </View>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default App;
