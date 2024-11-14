import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Appbar, Drawer } from "react-native-paper";
import AllGamesPage from "./AllGames";
import AddGamePage from "./AddGame";

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const { colors } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Function to toggle drawer visibility
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Function to close the drawer when tapping outside
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      {/* Wrapper to detect presses outside */}
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <View style={styles.container}>
          <Appbar.Header style={{ backgroundColor: colors.myBeige }}>
            <Appbar.Action icon="menu" onPress={toggleDrawer} />
            <Appbar.Content />
          </Appbar.Header>

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
                  <Ionicons name="game-controller" color={colors.myOrange} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="AddGame"
              component={AddGamePage}
              options={{
                tabBarLabel: "Create",
                tabBarLabelStyle: { color: colors.myRed },
                tabBarIcon: ({ size }) => (
                  <Ionicons name="create" color={colors.myRed} size={size} />
                ),
              }}
            />
          </Tab.Navigator>

          {/* Drawer section */}
          {drawerVisible && (
            <Drawer.Section title="Drawer Menu" style={styles.drawer}>
              <Drawer.Item label="Item 1" onPress={() => {}} />
              <Drawer.Item label="Item 2" onPress={() => {}} />
              <Drawer.Item label="Item 3" onPress={() => {}} />
            </Drawer.Section>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent overlay
    zIndex: 0,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    width: 250,
    height: "100%",
    zIndex: 1,
  },
});

export default HomePage;
