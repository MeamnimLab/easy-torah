import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import AllGamesPage from "./AllGames";
import AddGamePage from "./AddGame";
import AllLevelsPage from "./create/Levels";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: colors.myBeige },
          tabBarActiveTintColor: colors.myOrange,
          tabBarInactiveTintColor: colors.myGray,
          headerStyle: {
            backgroundColor: colors.myBeige,
          },
        }}
      >
        <Tab.Screen
          name="AllGames"
          component={AllGamesPage}
          options={{
            tabBarLabel: "Play",
            tabBarLabelStyle: { color: colors.myOrange },
            tabBarIcon: ({ size }) => (
              <Ionicons
                name="game-controller"
                color={colors.myOrange}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="LevelsOfCreate"
          component={AllLevelsPage}
          options={{
            tabBarLabel: "Create",
            tabBarLabelStyle: { color: colors.myRed },
            tabBarIcon: ({ size }) => (
              <Ionicons name="create" color={colors.myRed} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
