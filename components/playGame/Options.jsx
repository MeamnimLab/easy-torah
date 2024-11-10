import { useState } from "react";
import { View } from "react-native";
import Option from "./Option";

const Options = (props) => {
  const { options, correctAnswersIds, onAnswered } = props;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const optionsComponents = options.map((option) => {
    let bgColor;
    if (selectedAnswer && correctAnswersIds.includes(option.id)) {
      bgColor = "#86efac";
    } else if (selectedAnswer === option.id) {
      bgColor = "#fca5a5";
    } else {
      bgColor = null;
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
