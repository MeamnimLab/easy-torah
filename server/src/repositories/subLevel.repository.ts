import { Repository } from "typeorm";
import { SubLevel } from "../entities/subLevel.entity";
import BaseRepository from "./base/baseRepository.repository";
import UserSubLevelProgress from "../entities/userSubLevelProgress.entity";

class SubLevelRepository extends BaseRepository<SubLevel> {
    protected repository!: Repository<SubLevel>;
    protected relations: string[] = [];
  
    constructor() {
      super(SubLevel);
    }

    public async getAllSubLevelsWithUserProgress(userId: string, levelId: string): Promise<any> {
      const subLevels = await this.repository
        .createQueryBuilder("subLevel")
        .leftJoinAndMapOne(
          "subLevel.userSubLevelProgress",
          UserSubLevelProgress,
          "userSubLevelProgress",
          "userSubLevelProgress.levelProgressId = :levelId AND userSubLevelProgress.userId = :userId",
          { userId, levelId }
        )
        .where("subLevel.levelId = :levelId", { levelId })
        .getMany();
  
      return subLevels;
    }

    public async getSubLevel(levelId: string): Promise<any> {
      const subLevels = await this.repository
        .createQueryBuilder("subLevel")
        .where("subLevel.levelId = :levelId", { levelId })
        .getMany();
  
      return subLevels;
    }

  }
  
  export default SubLevelRepository;