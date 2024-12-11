import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

import LevelGridTile from "../components/LevelGridTile";
import { useDispatch } from "react-redux";
import { useTheme } from "react-native-paper";
import useHttp from "../hooks/http";
import Loading from '../components/ui/Loading'
import { useLanguage } from "@/components/context/LanguageContext";

const AllGamesPage = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [levelData, setLevelData] = useState([]);
  const { locale } = useLanguage();

  const { isLoading, error, sendRequest: fetchLevelData } = useHttp();

  const renderLevel = ({ item }) => {

    const pressHandler = () => {
      if(item.hasGame && item.id){
        navigation.navigate("SubLevels", {levelId: item.id});
      }
    };

    return (
      <LevelGridTile
        title={item.name.title[locale]}
        content={item.name.description[locale]}
        onPress={pressHandler}
        icon={item.icon.name}
        locked={!item.hasGame}
        stars={-1}
      />
    );
  };

  useEffect(() => {
    let url = "https://easy-torah-production.up.railway.app/api/level/getLevelsWithProgress/1"

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

  if (isLoading) {
    content = <Loading/>
  }

  if(error){
    content = <Text>error: {error}</Text>
  }

  return content;
};

export default AllGamesPage;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
