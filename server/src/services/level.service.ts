import LevelRepository from "../repositories/level.repository";
import UserProgressRepository from "../repositories/userProgress.repository";
import BaseService from "./base/baseService.service";

class LevelService extends BaseService {
  public repositories: [LevelRepository, UserProgressRepository] = [new LevelRepository(), new UserProgressRepository()];

  async getLevelsWithProgress(userId: string) {
    const levels = await this.repositories[0].getAllLevelsWithUserProgress(userId);
    return levels;
    // const userProgress = await this.repositories[1].find2(userId);

    // const levelsWithProgress = levels.map((level: any) => {
    //   const progress = userProgress.find((p: any) => p.level.id === level.id);
    //   return {
    //     ...level,
    //     userProgress: progress
    //       ? progress
    //       : { completed: false, score: 0, subLevelsCompleted: 0 },
    //   };
    // });

    // return levelsWithProgress;
  }
}

export default LevelService;
