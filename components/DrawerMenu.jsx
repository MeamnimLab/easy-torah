import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Drawer, Button, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useLanguage } from "./context/LanguageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DrawerMenu = ({ visible, onClose }) => {
  const { colors } = useTheme(); // Access the theme colors
  const { changeLanguage, t, currentLanguage } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(currentLanguage === "en");

  const currentLanguageLabel = isEnglish ? "English" : "עברית";

  // Toggle language when the button is pressed
  const toggleLanguage = () => {
    const newLanguage = isEnglish ? "he" : "en";
    changeLanguage(newLanguage);
    setIsEnglish(!isEnglish);
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.drawerContainer,
          { backgroundColor: colors.myBeige }, // Use theme color
        ]}
      >
        <Drawer.Section>
          <View style={styles.languageContainer}>
            <MaterialCommunityIcons
              name={"earth"}
              size={24}
              color={colors.text} // Use theme color for icon
            />
            <Text style={[styles.languageText, { color: colors.text }]}>
              {currentLanguageLabel}
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={toggleLanguage}
            style={[styles.button, { backgroundColor: colors.myOrange }]} // Use theme color
          >
            {isEnglish ? t("switchToHebrew") : t("switchToEnglish")}
          </Button>
        </Drawer.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  drawerContainer: {
    width: 250,
    height: "100%",
    paddingTop: 40, // Increased top padding for more space from the top
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  languageText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 8, // Additional styling if needed
  },
});

export default DrawerMenu;
