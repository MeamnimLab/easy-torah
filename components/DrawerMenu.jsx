import React from "react";
import { Drawer } from "react-native-paper";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const DrawerMenu = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.drawerContainer}>
          <Drawer.Section title="Drawer Menu">
            <Drawer.Item label="Item 1" onPress={onClose} />
            <Drawer.Item label="Item 2" onPress={onClose} />
            <Drawer.Item label="Item 3" onPress={onClose} />
          </Drawer.Section>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: "#F7EDE2", //change to my beige
    width: 250,
    height: "100%",
    padding: 16,
  },
});

export default DrawerMenu;
