import { Pressable, StyleSheet, Text, View } from "react-native";

const Option = (props) => {
  const { option, description, onPress, disabled, bgColor } = props;
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        disabled && bgColor && {backgroundColor: bgColor},
        pressed ? styles.buttonPressed : null,
      ]}
    >
      <View>
        <Text style={styles.optionText}>{option}</Text>
        {disabled && bgColor && <Text>{description}</Text>}
      </View>
    </Pressable>
  );
};

export default Option;

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "gray",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
