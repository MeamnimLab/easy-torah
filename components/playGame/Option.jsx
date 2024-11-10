import { Pressable, StyleSheet, Text } from "react-native";

const Option = (props) => {
    const {option, description, onPress, disabled} = props
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.root
      ]}
    >
      <Text style={styles.optionText}>{option}</Text>
      {description ? <Text>{description}</Text> : null}
    </Pressable>
  );
};

export default Option;

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "green",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
