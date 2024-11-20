import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import LevelBox from "../../components/LevelBox";
import { useTheme } from "react-native-paper";
import useHttp from "../../hooks/http";
import Loading from '../../components/ui/Loading'

const AllLevelsPage = ({ navigation }) => {
  const { colors } = useTheme();
  const [levelData, setLevelData] = useState([]);

  const { isLoading, error, sendRequest: fetchLevelData } = useHttp();

  const renderLevel = ({ item }) => {

    const pressHandler = () => {
      if(item.hasGame && item.id){
        navigation.navigate("SubLevelsOfCreate", {levelId: item.id});
      }
    };

    // const pressHandler = () => {
    //   if(item.hasGame && item.id){
    //     navigation.navigate("SubLevelsPage", {levelId: item.id, type: 'create'});
    //   }
    // };

    return (
      <LevelBox
        title={item.name.title.en}
        content={item.name.description.en}
        onPress={pressHandler}
        icon={item.icon.name}
        locked={!item.hasGame}
      />
    );
  };

  useEffect(() => {
    let url = "https://easy-torah.onrender.com/api/level/"

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

export default AllLevelsPage;

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
