import { IIcon } from "../interfaces/icon.interface";
import { ILevelName } from "../interfaces/levelName.interface";
import SubLevelRepository from "../repositories/subLevel.repository";
import BaseService from "./base/baseService.service";

class SubLevelService extends BaseService {
    public repositories = [new SubLevelRepository()];

    async getSubLevelsWithProgress(userId: string, levelId: string) {
      const subLevels = await this.repositories[0].getAllSubLevelsWithUserProgress(userId, levelId);
      return subLevels;
    }

    async getSubLevel(levelId: string) {
      const subLevels = await this.repositories[0].getSubLevel(levelId);
      return subLevels;
    }

    async editSubLevel(subLevelId: string, name: ILevelName, icon: IIcon) {
      const subLevel = await this.repositories[0].findById(subLevelId);
      if(!subLevel) return;
      subLevel.name = name;
      subLevel.icon = icon;
      const updatedSubLevel = await this.repositories[0].save(subLevel)
      return updatedSubLevel;
    }
  }
  
  export default SubLevelService;