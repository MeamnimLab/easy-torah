import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import LevelBox from "../../components/LevelBox";
import { useTheme } from "react-native-paper";
import useHttp from "../../hooks/http";
import Loading from "../../components/ui/Loading";
import { useLanguage } from "../../components/context/LanguageContext";
import LevelActionModal from "../../components/LevelActionModal.jsx";

const AllLevelsPage = ({ navigation }) => {
  const { colors } = useTheme();
  const [levelData, setLevelData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const { locale } = useLanguage();

  const { isLoading, error, sendRequest: fetchLevelData } = useHttp();
  const { sendRequest: postEditLevel } = useHttp();

  const renderLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        navigation.navigate("SubLevelsOfCreate", { levelId: item.id });
      }
    };

    const handleLongPress = () => {
      setSelectedLevel(item);
      setModalVisible(true);
    };

    return (
      <LevelBox
        title={item.name.title[locale]}
        content={item.name.description[locale]}
        onPress={pressHandler}
        onLongPress={handleLongPress}
        icon={item.icon.name}
        locked={!item.hasGame}
      />
    );
  };

  const handleEdit = (updatedLevelData) => {
    console.log(updatedLevelData)
    const url = `api/level/${selectedLevel.id}`;
    const body = updatedLevelData;

    postEditLevel(
      {
        url,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body,
      },
      (response) => {
        setEdited(!edited)
        setModalVisible(false); // Close the modal
      }
    );
  };

  useEffect(() => {
    let url = "api/level/";

    const transformLevels = (levelsObj) => {
      setLevelData(levelsObj.data);
    };

    fetchLevelData({ url }, transformLevels);
  }, [fetchLevelData, edited]);

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
    content = <Loading />;
  }

  if (error) {
    content = <Text>error: {error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {content}
      <LevelActionModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleEdit}
        levelData={selectedLevel}
      />
    </View>
  );
};

export default AllLevelsPage;
