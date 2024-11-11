import { StyleSheet, Pressable, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const QuestionNumbers = (props) => {
  const {colors} = useTheme();
  const { current, onQuestionTouch } = props;

  const gameInfo = useSelector((state) => state.game.game);
  const { answeredData = [] } = gameInfo;
  const numberQuestion = answeredData.map(({ state }, index) => {
    const circleStyles = { backgroundColor: null };
    if (current === index) {
      circleStyles.borderWidth = 1;
      circleStyles.borderColor = colors.myOrange;
    } else if (state === "TRUE") {
      circleStyles.backgroundColor = colors.myGreen;
    } else if (state === "FALSE") {
      circleStyles.backgroundColor = colors.myRed;
    } else {
      circleStyles.backgroundColor = colors.myGray;
    }

    return (
      <Pressable key={index} onPress={onQuestionTouch.bind(this, index)}>
        <View
          style={[
            styles.circle,
            circleStyles
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
