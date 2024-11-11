import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";

function LevelGridTile({ title, content, color, onPress }) {
  return (
    <Surface style={[styles.gridItem, { backgroundColor: color }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : null,
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </Pressable>
    </Surface>
  );
}

export default LevelGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 110,
    borderRadius: 30,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
});
