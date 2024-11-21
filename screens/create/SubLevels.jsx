import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import useHttp from "../../hooks/http";
import { useTheme } from "react-native-paper";
import LevelBox from "../../components/LevelBox";
import Loading from "../../components/ui/Loading";
import { useLanguage } from "../../components/context/LanguageContext";

const AllSubLevelsPage = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [subLevelData, setSubLevelData] = useState([]);
  const { locale } = useLanguage();
  const { levelId } = route.params;

  const { isLoading, error, sendRequest: fetchSubLevelData } = useHttp();

  const renderSubLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        navigation.navigate("SubLevelGamesOfCreate", {subLevelId: item.id});
      }
    };

    return (
      <LevelBox
        title={item.name[locale]}
        onPress={pressHandler}
        locked={!item.hasGame}
      />
    );
  };

  useEffect(() => {
    let url = `https://easy-torah.onrender.com/api/subLevel/${levelId}`;

    const transformSubLevels = (subLevelsObj) => {
      setSubLevelData(subLevelsObj.data);
    };

    fetchSubLevelData({ url }, transformSubLevels);
  }, [fetchSubLevelData, levelId]);

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
    content = <Loading />;
  }

  if (error) {
    content = <Text>error: {error}</Text>;
  }

  return content;
};

export default AllSubLevelsPage;
