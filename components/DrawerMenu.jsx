import React from "react";
import { Drawer } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useLanguage } from "./context/LanguageContext";

const DrawerMenu = ({ visible, onClose }) => {
  const { changeLanguage, t } = useLanguage();

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawerContainer}>
        <Drawer.Section title="Language Settings">
          <Drawer.Item
            label={t('switchToEnglish')}
            onPress={() => {
              changeLanguage("en");
              onClose();
            }}
          />
          <Drawer.Item
            label={t('switchToHebrew')}
            onPress={() => {
              changeLanguage("he");
              onClose();
            }}
          />
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
    backgroundColor: "#F7EDE2", // Your custom beige color
    width: 250,
    height: "100%",
    padding: 16,
  },
});

export default DrawerMenu;
