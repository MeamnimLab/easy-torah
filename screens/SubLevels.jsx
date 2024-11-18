import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import useHttp from "../hooks/http";
import { initLevelId } from "@/redux/gameSlice";
import { Button, useTheme } from "react-native-paper";
import LevelGridTile from "@/components/LevelGridTile";

const SubLevelsPage = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [subLevelData, setSubLevelData] = useState([]);
  const { levelId } = route.params;

  const dispatch = useDispatch();

  const { isLoading, error, sendRequest: fetchSubLevelData } = useHttp();

  const renderSubLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        dispatch(initLevelId(item.id));
        navigation.navigate("PlayGame");
      }
    };

    return (
      <LevelGridTile
      title={item.name}
      onPress={pressHandler}
    />
    );
  };

  useEffect(() => {
    let url = `https://easy-torah.onrender.com/api/subLevel/getSubLevelsWithProgress/1/${levelId}`;

    const transformSubLevels = (subLevelsObj) => {
      setSubLevelData(subLevelsObj.data);
    };

    fetchSubLevelData({ url }, transformSubLevels);
  }, [fetchSubLevelData, levelId]);

  useEffect(() => {
    console.log(subLevelData)
  }, [subLevelData]);

  let content = (
    <FlatList
      data={subLevelData}
      keyExtractor={(item) => item.id}
      renderItem={renderSubLevel}
      numColumns={2}
      style={{ backgroundColor: colors.myBeige }}
    />
  );

  if (isLoading) {
    content = <Text>loading</Text>;
  }

  if (error) {
    content = <Text>error: {error}</Text>;
  }

  return content;
};

export default SubLevelsPage;
