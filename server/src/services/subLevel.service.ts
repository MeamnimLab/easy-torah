import SubLevelRepository from "../repositories/subLevel.repository";
import BaseService from "./base/baseService.service";

class SubLevelService extends BaseService {
    public repositories = [new SubLevelRepository()];

    async getSubLevelsWithProgress(userId: string, levelId: string) {
      const subLevels = await this.repositories[0].getAllSubLevelsWithUserProgress(userId, levelId);
      return subLevels;
    }
  }
  
  export default SubLevelService;