import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const PlayTrivia = (props) => {
  const games = useSelector((state) => state.games.games);
  const gameId = props.gameId;
  const game = games.find((game) => game.id === gameId);
  if (!game) {
    return (
      <View style={styles.screen}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }
  const { answers, answersAmount, correctAnswersIds, question } = game;
  return (
    <View style={styles.screen}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.correctAnswerText}>
        Correct Answer(s): {correctAnswersIds.join(", ")}
      </Text>
      <View style={styles.answersList}>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answers[0].answer}</Text>
          {answers[0].comment && (
            <Text style={styles.commentText}>{answers[0].comment}</Text>
          )}
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answers[1].answer}</Text>
          {answers[1].comment && (
            <Text style={styles.commentText}>{answers[1].comment}</Text>
          )}
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answers[2].answer}</Text>
          {answers[2].comment && (
            <Text style={styles.commentText}>{answers[2].comment}</Text>
          )}
        </View>
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answers[3].answer}</Text>
          {answers[3].comment && (
            <Text style={styles.commentText}>{answers[3].comment}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  correctAnswerText: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
  answersList: {
    marginTop: 15,
  },
  answerContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
});

export default PlayTrivia;
