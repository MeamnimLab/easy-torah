import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

function LevelGridTile({ title, content, onPress, icon, locked,stars }) {

  const {colors} = useTheme();

  const starPositions = [
    { transform: [{ translateX: -30 }, { translateY: -5 }] },
    { transform: [{ translateX: 0 }, { translateY: -15 }] },
    { transform: [{ translateX: 30 }, { translateY: -5 }] },
  ];
  return (
    <Surface style={[styles.gridItem]}>
      <Pressable
        onPress={onPress}
        disabled={locked}
        android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : null,
        ]}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{title}</Text>
        </View>

        {locked && (
          <View style={styles.lockContainer}>
            <Ionicons name="lock-closed" size={30} color={colors.myGray} />
          </View>
        )}

        {locked && (
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name={icon} size={50} color={colors.myOrange} />
            </View>
          </View>
        )}

        {!locked && stars!= -1 && (
          <View style={styles.contentContainer}>
            {starPositions.map((position, index) => (
              <View key={index} style={[styles.starWrapper, position]}>
                <Ionicons name="star" size={30} color={colors.myOrange} />
              </View>
            ))}
          </View>

        )}
        {!locked && stars== -1 && (
          <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={"play-forward"} size={50} color={colors.myRed} />
          </View>
        </View>

        )}

        {content && <View style={styles.titleSection}>
          <View style={styles.divider} />
          <Text style={styles.title}>{content}</Text>
        </View>}
      </Pressable>
    </Surface>
  );
}

export default LevelGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 8,
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  locked: {
    opacity: 0.5,
  },
  numberContainer: {
    position: "absolute",
    top: 12,
    right: 16,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  lockContainer: {
    position: "absolute",
    top: 12,
    left: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  iconContainer: {
    padding: 8,
  },
  titleSection: {
    width: "100%",
    marginTop: 7,
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 6,
    width: "100%",
  },
  title: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  starWrapper: {
    position: "absolute",
  },
});
