import { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PlayTrivia from "../../components/playGame/Trivia";
import PlayTrueFalse from "../../components/playGame/TrueFalse";
import PlayVocabulary from "../../components/playGame/Vocabulary";
import Header from "../../components/playGame/header/Header";
import PagerView from "react-native-pager-view";
import Animated from "react-native-reanimated";
import {
  initAnswerdData,
  initNumOfQuestions,
  setAnswer,
  setVisited,
} from "@/redux/gameSlice";
import { ProgressBar, useTheme } from "react-native-paper";
import useHttp from "@/hooks/http";
import Loading from "@/components/ui/Loading";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const AllSubLevelGamesPage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { subLevelId } = route.params;
  const { colors } = useTheme();
  const screenStyle = { backgroundColor: colors.myBeige };

  const [subLevelGames, setSubLevelGames] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    let url = `https://easy-torah.onrender.com/api/game/${subLevelId}`;

    const transformGames = (gamesObj) => {
      setSubLevelGames(gamesObj.data);
    };

    sendRequest({ url }, transformGames);
  }, [sendRequest]);

  const [currentIndex, setCurrentIndex] = useState(1);

  const pagerViewRef = useRef(null);

  // Effect run to update the header
//   useEffect(() => {
//     if (subLevelGames.length > 0) {
//       navigation.setOptions({
//         header: () => (
//           <Header
//             current={currentIndex}
//             onQuestionTouch={(index) => {
//               pagerViewRef.current?.setPage(index);
//             }}
//             onBackPress={navigation.goBack}
//           />
//         ),
//       });
//     }
//   }, [navigation, currentIndex, subLevelGames.length]);

  const renderGame = (game) => {
    if (!game.type) return null;
    switch (game.type) {
      case "trivia":
        return <PlayTrivia game={game} />;
      // return <PlayTrivia game={game} onAnswered={onAnswered} />;
      case "trueFalse":
        return <PlayTrueFalse game={game} />;
      // return <PlayTrueFalse game={game} onAnswered={onAnswered} />;
      case "vocabulary":
        return <PlayVocabulary game={game} />;
      default:
        return null;
    }
  };

  let content = (
    <View style={[styles.screen, screenStyle]}>
      {subLevelGames.length > 0 && (
        <>
          {/* Move ProgressBar outside of PagerView */}
          <ProgressBar
            progress={(currentIndex +1) / subLevelGames.length}
            color={colors.myGreen}
            style={styles.progressBar}
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

  return content;
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

// import PlayTrivia from "@/components/playGame/Trivia";
// import PlayTrueFalse from "@/components/playGame/TrueFalse";
// import PlayVocabulary from "@/components/playGame/Vocabulary";
// import Loading from "@/components/ui/Loading";
// import useHttp from "@/hooks/http";
// import { setAnswer } from "@/redux/gameSlice";
// import React, { useState, useRef, useEffect } from "react";
// import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
// import PagerView from "react-native-pager-view";
// import { ProgressBar, useTheme } from "react-native-paper";
// import { useDispatch } from "react-redux";

// const AllSubLevelGamesPage = ({route}) => {
//   const { colors } = useTheme();
//   const { subLevelId } = route.params;
//   const dispatch = useDispatch();
//   const [subLevelGames, setSubLevelGames] = useState([]);
//   const { isLoading, error, sendRequest } = useHttp();
//   const [currentGame, setCurrentGame] = useState(1); // Tracks the current game
//   const pagerViewRef = useRef(null);

//   useEffect(() => {
//     let url = `https://easy-torah.onrender.com/api/game/${subLevelId}`;

//     const transformGames = (gamesObj) => {
//       setSubLevelGames(gamesObj.data);
//     //   console.log(gamesObj.data);
//     };

//     sendRequest({ url }, transformGames);
//   }, [sendRequest]);

//   //?
//   // Function to update the header when the user scrolls
//   const handleViewableItemsChanged = useRef(({ viewableItems }) => {
//       if (viewableItems?.length > 0) {
//           const firstVisibleItem = viewableItems[0].index;
//           setCurrentGame(firstVisibleItem + 1);
//         }
//     }).current;

// //   const onAnswered = (answer, selectedAnswer) => {
// //     dispatch(
// //       setAnswer({
// //         gameIndex: currentIndex,
// //         state: answer,
// //         selectedAnswer: selectedAnswer,
// //       })
// //     );
// //   };

// const renderGame = (game) => {
//     if (!game.type) return <Text>Error: Unknown game type</Text>;
//     switch (game.type) {
//       case "trivia":
//         return <PlayTrivia game={game} />;
//       case "trueFalse":
//         return <PlayTrueFalse game={game} />;
//       case "vocabulary":
//         return <PlayVocabulary game={game} />;
//       default:
//         return (
//           <View style={styles.errorContainer}>
//             <Text style={[styles.errorText, { color: colors.error }]}>
//               Unknown game type
//             </Text>
//           </View>
//         );
//     }
//   };

//   //   return (
//   //     <View style={[styles.screen, screenStyle]}>
//   //       {subLevelGames.length > 0 && <AnimatedPagerView
//   //         ref={pagerViewRef}
//   //         style={{ flex: 1 }}
//   //         initialPage={0}
//   //         onPageSelected={(e) => {
//   //           if (subLevelGames[e.nativeEvent.position].type === "vocabulary") {
//   //             dispatch(setVisited({ gameIndex: e.nativeEvent.position }));
//   //           }
//   //           setCurrentIndex(e.nativeEvent.position);
//   //         }}
//   //       >
//   //         {subLevelGames.length > 0 && subLevelGames.map((game, index) => (
//   //           <View key={index} style={styles.page}>
//   //             {renderGame(game)}
//   //           </View>
//   //         ))}
//   //       </AnimatedPagerView>}
//   //     </View>
//   //   );

//   const handlePageSelected = (event) => {
//     setCurrentGame(event.nativeEvent.position + 1);
//   };

//   let content = (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: colors.primary }]}>
//         <Text style={[styles.headerText, { color: colors.onPrimary }]}>
//           Game {currentGame} / {subLevelGames.length}
//         </Text>
//       </View>
//       <ProgressBar progress={currentGame / subLevelGames.length} color={colors.myGreen} />

//       {/* PagerView */}
//       <PagerView
//         ref={pagerViewRef}
//         style={{ flex: 1 }}
//         initialPage={0}
//         onPageSelected={handlePageSelected}
//       >
//         {subLevelGames.map((game, index) => (
//           <View key={index} style={styles.page}>
//             {renderGame(game)}
//           </View>
//         ))}
//       </PagerView>
//     </View>
//   );

//   if (isLoading) {
//     content = <Loading />;
//   }

//   if (error) {
//     content = <Text>error: {error}</Text>;
//   }

//   return content;
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//       },
//       header: {
//         height: 60,
//         justifyContent: "center",
//         alignItems: "center",
//         elevation: 4,
//       },
//       headerText: {
//         fontSize: 18,
//         fontWeight: "bold",
//       },
//       page: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//         backgroundColor: "#f8f8f8",
//       },
//       errorContainer: {
//         justifyContent: "center",
//         alignItems: "center",
//         flex: 1,
//       },
//       errorText: {
//         fontSize: 16,
//         fontWeight: "bold",
//       },
// });

// export default AllSubLevelGamesPage;
