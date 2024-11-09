import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Game = (props) => {
  const {gameId, type, levelId } = props;
  const navigation = useNavigation();
  const startTriviaGameHandler = (gameId, levelId) => {
    console.log(gameId);
    navigation.navigate("PlayTrivia", { gameId: gameId, levelId: levelId });
  };
  const startTrueFalseGameHandler = (gameId) => {
    console.log(gameId);
    navigation.navigate("PlayTrueFalse", { gameId: gameId, levelId: levelId });
  };
  let content;
  switch (type) {
    case "trivia":
      content = (
        <View style={styles.screen}>
          <Button title="startTriviaGame" onPress={startTriviaGameHandler.bind(this, gameId, levelId)} />
        </View>
      );
      break;
    case "trueFalse":
      content = (
        <View style={styles.screen}>
          <Button title="startTrueFalseGame" onPress={startTrueFalseGameHandler.bind(this, gameId, levelId)} />
        </View>
      );
      break;
    default:
      content = <Text>so such type : {type}</Text>;
      break;
  }
  return <View style={styles.screen}>{content}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Game;
