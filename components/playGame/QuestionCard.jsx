import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";

const QuestionCard = ({ question }) => {
  const { colors } = useTheme();
  const backgroundColor = colors.myOrange;
  return (
    <Surface style={[styles.root, { backgroundColor: backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.optionText}>{question}</Text>
      </View>
    </Surface>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  root: {
    marginBottom: 50,
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  content: {
    minHeight: 50,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
