import UserProgress from "../entities/userProgress.entity";
import UserSubLevelProgress from "../entities/userSubLevelProgress.entity";
import LevelRepository from "../repositories/level.repository";
import SubLevelRepository from "../repositories/subLevel.repository";
import UserRepository from "../repositories/user.repository";
import UserProgressRepository from "../repositories/userProgress.repository";
import UserSubLevelProgressRepository from "../repositories/userSubLevelProgress.repository";
import BaseService from "./base/baseService.service";

class UserProgressService extends BaseService {
  public repositories: [
    UserProgressRepository,
    UserRepository,
    SubLevelRepository,
    LevelRepository,
    UserSubLevelProgressRepository
  ] = [
    new UserProgressRepository(),
    new UserRepository(),
    new SubLevelRepository(),
    new LevelRepository(),
    new UserSubLevelProgressRepository(),
  ];

  public async createUserProgress(
    userId: string,
    subLevelId: string,
  ): Promise<any> {
    const user = await this.repositories[1].findById(userId);
    const subLevel = await this.repositories[2].findById(subLevelId);
    const level = await this.repositories[3].findById(subLevelId.slice(0, -1));

    if (!user || !subLevel || !level) {
      return null;
    }
    // Check if level progress exists for the user
    let userProgress = await this.repositories[0].findUserProgress(
      +userId,
      +subLevelId
    );

    if (!userProgress) {
      // If no progress found, create a new UserProgress entry
      userProgress = new UserProgress({
        user: user,
        level: level,
        completed: false,
        score: 0,
        subLevelsCompleted: 0,
      });

      // Save the new UserProgress
      userProgress = await this.repositories[0].save(userProgress);
    }

    // Check if sub-level progress exists
    let subLevelProgress = await this.repositories[4].findOne(
      +userId,
      +subLevelId
    );

    if (!subLevelProgress) {
      // If no sub-level progress found, create a new UserSubLevelProgress entry
      subLevelProgress = new UserSubLevelProgress({
        user: user,
        subLevel: subLevel,
        completed: false,
        score: 0,
        levelProgress: userProgress,
      });

      // Save the new UserSubLevelProgress
      await this.repositories[4].save(subLevelProgress);
    } else {
      // Update the sub-level progress if it exists
      subLevelProgress.completed = false;
      await this.repositories[4].save(subLevelProgress);
    }

    return { userProgress, subLevelProgress };
  }

  public async finishSubLevel(
    userId: string,
    subLevelId: string,
    score: number
  ): Promise<any> {
    const user = await this.repositories[1].findById(userId);
    const subLevel = await this.repositories[2].findById(subLevelId);
    const level = await this.repositories[3].findById(subLevelId.slice(0, -1));

    const userProgress = await this.repositories[0].findUserProgress(
      +userId,
      +subLevelId
    );
    const subLevelProgress = await this.repositories[4].findOne(
      +userId,
      +subLevelId
    );
    if (!user || !subLevel || !level || !userProgress || !subLevelProgress) {
      return null;
    }

    // Update the sub-level progress if it exists
    subLevelProgress.completed = true;
    subLevelProgress.score = score;
    await this.repositories[4].save(subLevelProgress);
    
    userProgress.score = Math.floor(Math.random() * 4);
    userProgress.subLevelsCompleted +=1
    userProgress.completed = !userProgress.completed;
    await this.repositories[0].save(userProgress);

    return { userProgress, subLevelProgress };
  }
}

export default UserProgressService;
