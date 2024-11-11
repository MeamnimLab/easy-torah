import { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PlayTrivia from "../../components/playGame/Trivia";
import PlayTrueFalse from "../../components/playGame/TrueFalse";
import Header from "../../components/playGame/header/Header";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";
import { initAnswerdData, initNumOfQuestions, setAnswer } from "@/redux/gameSlice";
import { useTheme } from "react-native-paper";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const PlayGamePage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const levels = useSelector((state) => state.levels.levels);
  const gameInfo = useSelector((state) => state.game.game);
  const {finish: isGameFinished, numOfQuestions, correctAnswersAmount} = gameInfo;
  const screenStyle = { backgroundColor: colors.background }

  const levelGames = useMemo(() => {
    const level = levels.find((lev) => lev.id === gameInfo.levelId);
    return level?.games || [];
  }, [levels, gameInfo.levelId]);

  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    dispatch(initNumOfQuestions(levelGames.length));
    dispatch(
      initAnswerdData(
        Array.from({ length: levelGames.length }, () => ({
          selectedAnswer: null,
          state: "WAIT",
        }))
      )
    );
  }, [levelGames]);

  useEffect(() => {
    if (isGameFinished) {
      navigation.navigate("Result", {totalQuestions: levelGames.length,
        timeTaken: Date.now() - startTimeRef.current, correctAnswers: correctAnswersAmount, totalQuestions: numOfQuestions});
    }
  }, [isGameFinished, navigation, levelGames.length, numOfQuestions, correctAnswersAmount]);


  const [currentIndex, setCurrentIndex] = useState(1);

  const pagerViewRef = useRef(null);

  // Effect run to update the header
  useEffect(() => {
    if (levelGames.length > 0) {
      navigation.setOptions({
        header: () => (
          <Header
            current={currentIndex}
            onQuestionTouch={(index) => {
              pagerViewRef.current?.setPage(index);
            }}
            onBackPress={navigation.goBack}
          />
        ),
      });
    }
  }, [navigation, currentIndex, levelGames.length]);

  const renderGame = (game) => {
    if (!game) return null;
    switch (game.type) {
      case "trivia":
        return <PlayTrivia game={game} onAnswered={onAnswered} />;
      case "trueFalse":
        return <PlayTrueFalse game={game} onAnswered={onAnswered} />;
      default:
        return null;
    }
  };

  const onAnswered = (answer, selectedAnswer) => {
    dispatch(setAnswer({gameIndex: currentIndex,state: answer,selectedAnswer: selectedAnswer}))
  };

  return (
    <View style={[styles.screen, screenStyle]}>
      <AnimatedPagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        {levelGames.map((game, index) => (
          <View key={index} style={styles.page}>
            {renderGame(game)}
          </View>
        ))}
      </AnimatedPagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayGamePage;