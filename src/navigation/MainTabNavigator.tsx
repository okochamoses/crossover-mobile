import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import CustomTabBar from "../components/CustomTabBar";
import Following from "../screens/Following";
import ForYou from "../screens/ForYou";
import DummyScreen from "../screens/DummyScreen";

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const screenOptions = (icon: any) => ({
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={icon} color={color} size={size} />
  ),
  tabBarStyle: { backgroundColor: "#000", borderTopWidth: 0 },
});

const MainTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.4)",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TopTabs}
        options={{ ...screenOptions("home-sharp"), headerShown: false }}
      />
      <BottomTab.Screen
        name="Discover"
        component={DummyScreen}
        options={screenOptions("compass-sharp")}
      />
      <BottomTab.Screen
        name="Activity"
        component={DummyScreen}
        options={screenOptions("stopwatch-sharp")}
      />
      <BottomTab.Screen
        name="BookMarks"
        component={DummyScreen}
        options={screenOptions("md-bookmark")}
      />
      <BottomTab.Screen
        name="Profile"
        component={DummyScreen}
        options={screenOptions("md-person-circle")}
      />
    </BottomTab.Navigator>
  );
};

const TopTabs = () => {
  return (
    <TopTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <TopTab.Screen name="Following" component={Following} />
      <TopTab.Screen name="For You" component={ForYou} />
    </TopTab.Navigator>
  );
};

export default MainTabNavigator;
