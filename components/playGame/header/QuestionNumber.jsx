import { StyleSheet, Pressable, View, Text } from "react-native";
import { useSelector } from "react-redux";

const QuestionNumbers = (props) => {
  const { current, onQuestionTouch } = props;

  const gameInfo = useSelector((state) => state.game.game);
  const { answeredData } = gameInfo;
  const numberQuestion = answeredData.map(({ state }, index) => {

    const color = (() => {
        if (current === index) return "#fcd34d";
        else if (state === 'TRUE') return "#86efac";
        else if (state === 'FALSE') return "#fca5a5";
        else return "#e5e5e5";
      })();

    return (
      <Pressable key={index} onPress={onQuestionTouch.bind(this, index)}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Text style={styles.text}>{index + 1}</Text>
        </View>
      </Pressable>
    );
  });

  return numberQuestion;
};

export default QuestionNumbers;

const styles = StyleSheet.create({
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
