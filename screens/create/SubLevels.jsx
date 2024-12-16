import React, { useState } from "react";
import LevelsList from "../../components/LevelsList";

const AllSubLevelsPage = ({ route }) => {
  const [subLevelData, setSubLevelData] = useState([]);
  const { levelId } = route.params;
  return (
    <LevelsList
      levelData={subLevelData}
      setLevelData={setSubLevelData}
      baseUrl={"api/subLevel/"}
      navDest={"SubLevelGamesOfCreate"}
      paramName={"subLevelId"}
      levelId={levelId}
    />
  );
};

export default AllSubLevelsPage;
