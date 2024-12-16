import { FlatList, Text, View } from "react-native";
import LevelActionModal from "./LevelActionModal";
import Loading from "./ui/Loading";
import { useEffect, useState } from "react";
import useHttp from "../hooks/http";
import { useTheme } from "react-native-paper";
import { useLanguage } from "./context/LanguageContext";
import LevelBox from "./LevelBox";
import { useNavigation } from "expo-router";

function LevelsList({
  levelData,
  baseUrl,
  setLevelData,
  navDest,
  paramName,
  levelId,
}) {
  const { colors } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const { locale } = useLanguage();
  const navigation = useNavigation();

  const { isLoading, error, sendRequest: fetchLevelData } = useHttp();
  const { sendRequest: postEditLevel } = useHttp();

  const renderLevel = ({ item }) => {
    const pressHandler = () => {
      if (item.hasGame && item.id) {
        const params = { [paramName]: item.id };
        navigation.navigate(navDest, params);
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
    const url = `${baseUrl}${selectedLevel.id}`;
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
    let url = baseUrl;
    if(levelId){
        url = `${baseUrl}/${levelId}`
    }

    const transformLevels = (levelsObj) => {
      setLevelData(levelsObj.data);
    };

    fetchLevelData({ url }, transformLevels);
  }, [fetchLevelData, edited, levelId]);

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
}

export default LevelsList;
