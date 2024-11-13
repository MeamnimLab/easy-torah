import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function LevelGridTile({ title, content, color, onPress, icon }) {
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
        <View style={styles.row}>
          <Text style={styles.content}>{content}</Text>
          <Ionicons name={icon} size={24} color={"#666"}/>
        </View>
      </Pressable>
    </Surface>
  );
}

export default LevelGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 130,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: 3,
  },
});
