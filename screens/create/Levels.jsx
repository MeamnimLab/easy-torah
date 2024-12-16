import React, { useState } from "react";
import LevelsList from "../../components/LevelsList.jsx";

const AllLevelsPage = () => {
  const [levelData, setLevelData] = useState([]);

  return (
    <LevelsList
      levelData={levelData}
      setLevelData={setLevelData}
      baseUrl={"api/level/"}
      navDest={"SubLevelsOfCreate"}
      paramName={"levelId"}
    />
  );
};

export default AllLevelsPage;
