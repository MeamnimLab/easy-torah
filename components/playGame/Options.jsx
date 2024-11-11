import { useState } from "react";
import { View } from "react-native";
import Option from "./Option";
import { useTheme } from "react-native-paper";

const Options = (props) => {
  const {colors} = useTheme();
  const { options, correctAnswersIds, onAnswered } = props;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const optionsComponents = options.map((option) => {
    let bgColor;
    if (selectedAnswer && correctAnswersIds.includes(option.id)) {
      bgColor = colors.myGreen;
    } else if (selectedAnswer === option.id) {
      bgColor = colors.myRed;
    } else {
      bgColor = colors.myGray;
    }
    return (
      <Option
        option={option.answer}
        description={option.comment}
        disabled={selectedAnswer ? true : false}
        bgColor={bgColor}
        onPress={() => {
          const isCorrect = correctAnswersIds.includes(option.id);
          onAnswered(isCorrect, option.id);
          setSelectedAnswer(option.id);
        }}
        key={option.id}
      />
    );
  });
  return (
    <View
      style={{
        gap: 4,
      }}
    >
      {optionsComponents}
    </View>
  );
};

export default Options;
