import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import PlayTrivia from '../../components/playGame/Trivia'
import PlayTrueFalse from '../../components/playGame/TrueFalse'

const PlayGamePage = ({ route, navigation }) => {
  const [score, setScore] = useState(0);
  const level = route.params.level;
  const levels = useSelector((state) => state.levels.levels);
  const levelData = levels.find((lev) => lev.id === level);
  let levelGames = []
  if(levelData && levelData.games){
    levelGames = levelData.games
  }
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
      game = <PlayTrivia game={currentGame}/>;
      break;
    case "trueFalse":
      game = <PlayTrueFalse game={currentGame}/>;
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
