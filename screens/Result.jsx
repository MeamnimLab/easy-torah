import { View, Text, StyleSheet, Button } from "react-native";
import ResultsCard from '../components/result/ResultsCard';
import TimeSpentCard from '../components/result/TimeSpentCard'
import { resetGame } from "@/redux/gameSlice";
import { useDispatch } from "react-redux";

const ResultPage = ({navigation, route}) => {
  const {totalQuestions,correctAnswers, timeTaken} = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.root}>
      <View style={styles.cardContainer}>
        <Text style={styles.resultsText}>Results</Text>
        <ResultsCard
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
        />
        <TimeSpentCard timeTaken={timeTaken} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Return home"
          textColor="#fafafa"
          backgroundColor="#fbbf24"
          onPress={() => {
            dispatch(resetGame());
            navigation.navigate("AllGames");    
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardContainer: {
    width: "100%",
    gap: 16,
  },
  buttonContainer: {
    width: "100%",
    gap: 8,
  },
  resultsText: {
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
  },
  button: {
    padding: 16,
    width: "100%",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    alignSelf: "center",
  },
});

export default ResultPage;
