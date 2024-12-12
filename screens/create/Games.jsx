import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import PlayTrivia from "../../components/playGame/Trivia";
import PlayTrueFalse from "../../components/playGame/TrueFalse";
import PlayVocabulary from "../../components/playGame/Vocabulary";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";
import { ProgressBar, useTheme } from "react-native-paper";
import useHttp from "@/hooks/http";
import Loading from "@/components/ui/Loading";
import GameNumberNav from "../../components/create/GameNumberNav";
import GameOptionsListModal from "../../components/GamesOptionsListModal";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const AllSubLevelGamesPage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { subLevelId } = route.params;
  const { colors } = useTheme();
  const screenStyle = { backgroundColor: colors.myBeige };

  const [subLevelGames, setSubLevelGames] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { isLoading, error, sendRequest } = useHttp();
  const { sendRequest: postAddGame } = useHttp();

  useEffect(() => {
    let url = `api/game/${subLevelId}`;

    const transformGames = (gamesObj) => {
      setSubLevelGames(gamesObj.data);
    };

    sendRequest({ url }, transformGames);
  }, [sendRequest]);

  const [currentIndex, setCurrentIndex] = useState(1);

  const pagerViewRef = useRef(null);

  const renderGame = (game) => {
    if (!game.type) return null;
    switch (game.type) {
      case "trivia":
        return <PlayTrivia game={game} />;
      case "trueFalse":
        return <PlayTrueFalse game={game} />;
      case "vocabulary":
        return <PlayVocabulary game={game} />;
      default:
        return null;
    }
  };

  const addPressHandler = () => {
    console.log("pressed add");
    setModalVisible(true);
  };

  let content = (
    <View style={[styles.screen, screenStyle]}>
      {subLevelGames.length > 0 && (
        <>
          <ProgressBar
            progress={(currentIndex + 1) / subLevelGames.length}
            color={colors.myGreen}
            style={styles.progressBar}
          />
          <GameNumberNav
            currentIndex={currentIndex}
            onQuestionTouch={(index) => {
              pagerViewRef.current?.setPage(index);
            }}
            questionsAmount={subLevelGames.length}
            onAddPress={addPressHandler}
          />
          <AnimatedPagerView
            ref={pagerViewRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={(e) => {
              setCurrentIndex(e.nativeEvent.position);
            }}
          >
            {subLevelGames.map((game, index) => (
              <View key={index} style={styles.page}>
                {renderGame(game)}
              </View>
            ))}
          </AnimatedPagerView>
        </>
      )}
    </View>
  );

  if (isLoading) {
    content = <Loading />;
  }

  if (error) {
    content = <Text>error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {content}
      <GameOptionsListModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCardPress={()=> navigation.navigate("CreateVocabulary", {subLevelId})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  page: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllSubLevelGamesPage;
