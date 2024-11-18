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
  const { sendRequest: postSubLevelUserProgress } = useHttp();

  const renderSubLevel = ({ item }) => {
    console.log("item")
    console.log(item)
    let stars = -1
    if(item.userSubLevelProgress.completed){
      stars = Math.floor(Math.random() * 4)
    }

    const pressHandler = () => {
      if (item.hasGame && item.id) {
        dispatch(initLevelId(item.id));
        const url = `https://easy-torah.onrender.com/api/userProgress/1/${item.id}`;

        const afterPost = (obj) => {
          console.log(obj)
        };
    
        postSubLevelUserProgress({ url, method: 'POST' }, afterPost);
        navigation.navigate("PlayGame");
      }
    };

    return (
      <LevelGridTile
      title={item.name}
      onPress={pressHandler}
      locked={!item.hasGame}
      stars={stars}
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


  // useEffect(() => {
  //   console.log(subLevelData)
  // }, [subLevelData]);

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
