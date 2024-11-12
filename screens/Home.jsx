import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllGamesPage from "./AllGames";
import AddGamePage from "./AddGame";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
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
          tabBarLabel: 'Play',
          tabBarLabelStyle: { color: colors.myOrange },
          tabBarIcon: ({ size }) => (
            <Ionicons name="game-controller" color={colors.myOrange} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddGame"
        component={AddGamePage}
        options={{
          tabBarLabel: 'Create',
          tabBarLabelStyle: { color: colors.myRed },
          tabBarIcon: ({ size }) => (
            <Ionicons name="create" color={colors.myRed} size={size} />
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
