import { View, Text, StyleSheet } from "react-native";
import Options from "./Options";
import QuestionCard from "./QuestionCard";

const PlayTrueFalse = (props) => {
  const { game, onAnswered } = props;

  if (!game) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }
  const { question, answer } = game;
  return (
    <View style={styles.root}>
      <QuestionCard question={question}/>
      <Options
        options={[{answer: "True", comment: 'comment to true answer', id: 1},{answer: "False", comment: 'comment to false answer', id: 2}]}
        correctAnswersIds={[answer? 1: 2]}
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

export default PlayTrueFalse;
