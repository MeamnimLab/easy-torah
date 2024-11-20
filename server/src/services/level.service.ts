import { IIcon } from "../interfaces/icon.interface";
import { ILevelName } from "../interfaces/levelName.interface";
import LevelRepository from "../repositories/level.repository";
import UserProgressRepository from "../repositories/userProgress.repository";
import BaseService from "./base/baseService.service";

class LevelService extends BaseService {
  public repositories: [LevelRepository, UserProgressRepository] = [new LevelRepository(), new UserProgressRepository()];

  async getLevelsWithProgress(userId: string) {
    const levels = await this.repositories[0].getAllLevelsWithUserProgress(userId);
    return levels;
  }

  async getAll() {
    const levels = await this.repositories[0].findAll();
    return levels;
  }

  async editLevel(levelId: string, name: ILevelName, icon: IIcon) {
    const level = await this.repositories[0].findById(levelId);
    if(!level) return;
    level.name = name;
    level.icon = icon;
    const updatedLevel = await this.repositories[0].save(level)
    return updatedLevel;
  }
}

export default LevelService;
