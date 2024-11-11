import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllGamesPage from "./AllGames";
import AddGamePage from "./AddGame";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="AllGames"
          component={AllGamesPage}
          options={{
            tabBarLabel: 'Play',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="game-controller" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AddGame"
          component={AddGamePage}
          options={{
            tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;

