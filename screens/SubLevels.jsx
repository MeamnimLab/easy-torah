import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

import { useTheme } from "react-native-paper";
import useHttp from "../hooks/http";

const SubLevelsPage = ({ navigation }) => {
//   const { colors } = useTheme();
//   const [levelData, setLevelData] = useState([]);

//   const { isLoading, error, sendRequest: fetchLevelData } = useHttp();

//   const renderLevel = ({ item }) => {
//     const pressHandler = () => {
//       if (item.hasGame && item.id) {
//         console.log("go to sub level", item.id);
//       }
//       // else if (state === 'SUB_LEVEL' && item.hasGame && item.id) {
//       //   dispatch(initLevelId(item.id));
//       //   navigation.navigate("PlayGame");
//       // }
//     };

//     return (
//       <LevelGridTile
//         title={item.name.title}
//         content={item.name.description}
//         onPress={pressHandler}
//         icon={item.icon.name}
//         locked={!item.hasGame}
//         stars={-1}
//       />
//     );
//   };

//   useEffect(() => {
//     let url = "http://10.0.2.2:3000/api/level/getLevelsWithProgress/1";

//     const transformLevels = (levelsObj) => {
//       setLevelData(levelsObj.data);
//     };

//     fetchLevelData({ url }, transformLevels);
//   }, [fetchLevelData]);

//   // useEffect(() => {
//   //   console.log(levelData)
//   // }, [levelData]);

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
    content = <Text>loading</Text>;
  }

  if (error) {
    content = <Text>error: {error}</Text>;
  }

  return content;
};

export default SubLevelsPage;
