import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import LevelGridTile from "../components/LevelGridTile";
import { useDispatch, useSelector } from "react-redux";
import { initLevelId } from "@/redux/gameSlice";
import { useTheme } from "react-native-paper";
import useHttp from "../hooks/http";

const AllGamesPage = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [levelData, setLevelData] = useState([]);

  const { isLoading, error, sendRequest: fetchLevelData } = useHttp();

  const renderLevel = ({ item }) => {

    const pressHandler = () => {
      if(item.hasGame && item.id){
        navigation.navigate("SubLevels", {levelId: item.id});
      }
    };

    return (
      <LevelGridTile
        title={item.name.title}
        content={item.name.description}
        onPress={pressHandler}
        icon={item.icon.name}
        locked={!item.hasGame}
        stars={-1}
      />
    );
  };

  useEffect(() => {
    let url = "http://192.168.43.175:3000/api/level/getLevelsWithProgress/1"

    const transformLevels = (levelsObj) => {
      setLevelData(levelsObj.data)
    };

    fetchLevelData(
      { url },
      transformLevels
    );

  }, [fetchLevelData]);

  // useEffect(() => {
  //   console.log(levelData)
  // }, [levelData]);

  let content = (
    <FlatList
      data={levelData}
      keyExtractor={(item) => item.id}
      renderItem={renderLevel}
      numColumns={2}
      style={{ backgroundColor: colors.myBeige }}
    />
  );

  if(isLoading){
    content = <Text>loading</Text>
  }

  if(error){
    content = <Text>error: {error}</Text>
  }

  return content;
};

export default AllGamesPage;
