import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import PlayTrivia from '../../components/playGame/Trivia'
import PlayTrueFalse from '../../components/playGame/TrueFalse'

const PlayGamePage = ({ route, navigation }) => {
  const [score, setScore] = useState(0);
  const games = useSelector((state) => state.games.games);
  const level = route.params.level;
  const levelGames = games.filter((game) => game.parendId === level);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentGame, setCurrentGame] = useState(levelGames[0]);
  console.log(levelGames);
  const nextHandler = (curIndex) => {
    if (curIndex === levelGames.length) {
      navigation.navigate("Result", {
        score,
        gamesAmount: levelGames.length,
      });
    }
    else{
        setCurrentIndex(curIndex + 1);
        setCurrentGame(levelGames.find((game) => game.id === curIndex + 1));
    }
  };
  let game = <></>;
  switch (currentGame.type) {
    case "trivia":
      game = <PlayTrivia gameId={currentGame.id}/>;
      break;
    case "trueFalse":
      game = <PlayTrueFalse gameId={currentGame.id}/>;
      break;

    default:
      break;
  }
  return (
    <View style={styles.screen}>
      <Text>
        here will be {currentIndex}/{levelGames.length}
      </Text>
      {game}
      <Button title="next" onPress={nextHandler.bind(this, currentIndex)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayGamePage;
