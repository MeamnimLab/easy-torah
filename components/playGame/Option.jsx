import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Surface, TouchableRipple } from "react-native-paper";

const Option = ({ option, description, onPress, disabled, bgColor }) => {
  return (
    <Surface
      style={[
        styles.root,
        disabled && bgColor && { backgroundColor: bgColor },
      ]}
    >
      <TouchableRipple
        onPress={onPress}
        disabled={disabled}
        rippleColor="rgba(0, 0, 0, 0.1)"
      >
        <View style={styles.content}>
          <Text style={styles.optionText}>{option}</Text>
          {disabled && bgColor && <Text style={styles.description}>{description}</Text>}
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default Option;

const styles = StyleSheet.create({
  root: {
    marginVertical: 2,
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  touchable: {
    borderRadius: 12,
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
  description: {
    marginTop: 4,
    fontSize: 14,
    color: "gray",
  },
});
