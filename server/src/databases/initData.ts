import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import path from "path";
import fs from "fs/promises";
import User from "../entities/user.entity";
import { TriviaGame } from "../entities/trivia.entity";
import { Level } from "../entities/level.entity";
import { SubLevel } from "../entities/subLevel.entity";
import { Game } from "../entities/game.entity";
import { TrueFalseGame } from "../entities/trueFalse.entity";
import { VocabularyGame } from "../entities/vocabulary.entity";
import UserProgress from "../entities/userProgress.entity";
// import UserSubLevelProgress from "../entities/userSubLevelProgress.entity";
import {
  validateAndNormalizeLanguage,
  validateAndNormalizeLevelName,
  validateAndNormalizeTriviaAnswers,
  validateAndNormalizeVocabularyHardSentences,
} from "../utils/validation.util";
import { AppDataSource } from "./dataSource";

const readJsonData = async (name: string): Promise<any> => {
  const filePath: string = path.join(__dirname, `../data/${name}.data.json`);
  const fileData: string = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileData);
};

// Generic function to normalize and map relationships for records
const normalizeAndMapRelations = async(
  name: string,
  records: any[],
  relationships: Record<string, Function>
) => {
  for (const record of records) {
    for (const [key, normalizeFn] of Object.entries(relationships)) {
      if (record[key]) {
        record[key] = normalizeFn(record[key]);
      }
    }
  }
};

const setRelationships = async(
  name: string,
  records: any[]
) => {
  const repositories = {
    level: AppDataSource.getRepository(Level),
    subLevel: AppDataSource.getRepository(SubLevel),
    game: AppDataSource.getRepository(Game),
    user: AppDataSource.getRepository(User),
    userProgress: AppDataSource.getRepository(UserProgress),
  };

  if (name === "subLevel") {
    const levelRepository: Repository<Level> = repositories.level;
    for (const subLevel of records) {
      subLevel.level = await levelRepository.findOneBy({
        id: subLevel.levelId,
      });
    }
  } else if (name === "game") {
    const subLevelRepository: Repository<SubLevel> = repositories.subLevel;
    for (const game of records) {
      game.subLevel = await subLevelRepository.findOneBy({
        id: game.subLevelId,
      });
    }
  } else if (
    name === "trivia" ||
    name === "trueFalse" ||
    name === "vocabulary"
  ) {
    const gameRepository: Repository<Game> = repositories.game;
    for (const gameData of records) {
      gameData.game = await gameRepository.findOneBy({ id: gameData.gameId });
    }
  } else if (name === "userProgress") {
    const levelRepository: Repository<Level> = repositories.level;
    const userRepository: Repository<User> = repositories.user;
    for (const userProgress of records) {
      userProgress.level = await levelRepository.findOneBy({
        id: userProgress.levelId,
      });
      userProgress.user = await userRepository.findOneBy({
        id: userProgress.userId,
      });
    }
  } else if (name === "userSubLevelProgress") {
    const subLevelRepository: Repository<SubLevel> = repositories.subLevel;
    const userRepository: Repository<User> = repositories.user;
    const userProgressRepository: Repository<UserProgress> =
      repositories.userProgress;
    for (const userProgress of records) {
      userProgress.subLevel = await subLevelRepository.findOneBy({
        id: userProgress.subLevelId,
      });
      userProgress.user = await userRepository.findOneBy({
        id: userProgress.userId,
      });
      userProgress.levelProgress = await userProgressRepository.findOneBy({
        id: userProgress.levelProgressId,
      });
    }
  }
};

const addData = async <T extends ObjectLiteral>(
  name: string,
  entity: EntityTarget<T>
) => {
  const records: any[] = await readJsonData(name);

  // Define normalization and relationship mapping functions for each entity
  const relationships: Record<string, Function> = {};
  if (name === "level") {
    relationships["name"] = validateAndNormalizeLevelName;
  } else if (name === "subLevel") {
    relationships["name"] = validateAndNormalizeLevelName;
  } else if (name === "trivia") {
    relationships["question"] = validateAndNormalizeLanguage;
    relationships["answers"] = validateAndNormalizeTriviaAnswers;
  } else if (name === "trueFalse") {
    relationships["question"] = validateAndNormalizeLanguage;
  } else if (name === "vocabulary") {
    relationships["text"] = validateAndNormalizeLanguage;
    relationships["hardSentences"] = validateAndNormalizeVocabularyHardSentences;
  }

  await normalizeAndMapRelations(name, records, relationships);
  await setRelationships(name, records);

  await AppDataSource.manager
    .createQueryBuilder()
    .insert()
    .into(entity)
    .values(records)
    .execute();
};

export const initalizeDataFromJsons = async () => {
  await addData("user", User);
  await addData("level", Level);
  await addData("subLevel", SubLevel);
  await addData("game", Game);
  await addData("trivia", TriviaGame);
  await addData("trueFalse", TrueFalseGame);
  await addData("vocabulary", VocabularyGame);
};
