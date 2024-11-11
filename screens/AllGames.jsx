import React from "react";
import { FlatList } from "react-native";

import LevelGridTile from "../components/LevelGridTile";
import { useDispatch, useSelector } from "react-redux";
import { initLevelId } from "@/redux/gameSlice";
import { useTheme } from "react-native-paper";

const AllGamesPage = ({ navigation }) => {
  const { colors } = useTheme(); 
  const dispatch = useDispatch();
  const levelData = useSelector((state) => state.levels.levels);
  const renderLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        dispatch(initLevelId(item.id));
        navigation.navigate("PlayGame");
      } else {
        navigation.navigate("AddGame");
      }
    };
    return (
      <LevelGridTile
        title={item.level}
        content={item.name}
        color={item.hasGame ? colors.secondaryContainer : colors.surface}
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
