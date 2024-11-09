import React from "react";
import {
  FlatList,
  Alert,
} from "react-native";

import LevelGridTile from '../components/LevelGridTile'
import { useSelector } from "react-redux";

const AllGamesPage = ({navigation}) => {

  const levelData = useSelector((state) => state.levels.levels);
  const renderLevel = ({ item }) => {
    const pressHandler = () => {
      if(item.hasGame){
        navigation.navigate('PlayGame', {
          level: item.id,
        });
      } else {
        Alert.alert("Here will be create game")
      }
    }
    return (
        <LevelGridTile
          title={`${item.level}: ${item.name}`}
          color={item.hasGame ? "pink": '#ccc'}
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
