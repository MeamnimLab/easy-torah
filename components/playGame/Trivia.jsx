import { View, Text, StyleSheet } from "react-native";
import Options from "./Options";
import QuestionCard from './QuestionCard'

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
      <QuestionCard question={question}/>
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
    flex: 1,
    padding: 16,
    paddingVertical: 40,
    gap: 10,
    width: "100%",
    justifyContent: "space-between"
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
