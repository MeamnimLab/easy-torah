import React from "react";
import { FlatList, Alert } from "react-native";

import LevelGridTile from "../components/LevelGridTile";
import { useDispatch, useSelector } from "react-redux";
import { initLevelId } from "@/redux/gameSlice";

const AllGamesPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const levelData = useSelector((state) => state.levels.levels);
  const renderLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        dispatch(initLevelId(item.id));
        navigation.navigate("PlayGame");
      } else {
        Alert.alert("Here will be create game");
      }
    };
    return (
      <LevelGridTile
        title={item.level}
        content={item.name}
        color={item.hasGame ? "pink" : "#ccc"}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={levelData}
      keyExtractor={(item) => item.id}
      renderItem={renderLevel}
      numColumns={2}
    />
  );
};

export default AllGamesPage;
