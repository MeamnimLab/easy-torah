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
      }
    };

    return (
      <LevelGridTile
        title={item.level}
        content={item.name}
        onPress={pressHandler}
        icon={item.icon}
        locked={!item.hasGame}
        stars={-1}
      />
    );
  };

  return (
    <FlatList
      data={levelData}
      keyExtractor={(item) => item.id}
      renderItem={renderLevel}
      numColumns={2}
      style={{ backgroundColor: colors.myBeige }}
    />
  );
};

export default AllGamesPage;
