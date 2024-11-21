import { View, Text, StyleSheet } from "react-native";
import Options from "./Options";
import QuestionCard from "./QuestionCard";
import { useLanguage } from "../context/LanguageContext";

const PlayTrueFalse = (props) => {
  const { game, onAnswered } = props;
  const {locale} = useLanguage();

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
      <QuestionCard question={question[locale]}/>
      <Options
        options={[{answer: {en: "True", he: 'נכון'}, description: {he:'הערה על התשובה הנכונה', en:'description to true answer'}, id: 1},{answer: {en: "False", he: 'לא נכון'}, description: {he:'הערה על התשובה הלא נכונה', en:'description to false answer'}, id: 2}]}
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
