import { View, Text, StyleSheet } from "react-native";
import Options from "./Options";

const PlayTrivia = (props) => {
  const { game, onAnswered } = props;

  if (!game) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }
  const { answers, correctAnswersIds, question } = game;
  return (
    <View style={styles.root}>
      <Text style={styles.questionText}>{question}</Text>
      <Options
        options={answers}
        correctAnswersIds={correctAnswersIds}
        onAnswered={onAnswered}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    gap: 10,
    width: "100%",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default PlayTrivia;
