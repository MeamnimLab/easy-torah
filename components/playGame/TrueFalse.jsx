import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

const PlayTrueFalse = (props) => {
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
  const { question, answer } = game;
  return (
    <View style={styles.screen}>
      <Text style={styles.questionText}>{question}</Text>
      <Text style={styles.correctAnswerText}>
        the answer is: {answer ? 'True': 'False'}
      </Text>
      <Button title="true"/>
      <Button title="false"/>
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

export default PlayTrueFalse;
