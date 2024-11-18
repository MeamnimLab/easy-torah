import { Repository } from "typeorm";
import { Level } from "../entities/level.entity";
import BaseRepository from "./base/baseRepository.repository";
import UserProgress from "../entities/userProgress.entity";

class LevelRepository extends BaseRepository<Level> {
  protected repository!: Repository<Level>;
  protected relations: string[] = [];

  constructor() {
    super(Level);
  }

  public async getAllLevelsWithUserProgress(userId: string): Promise<any> {
    const levels = await this.repository
      .createQueryBuilder("level")
      .leftJoinAndMapOne(
        "level.userProgress",
        UserProgress,
        "userProgress",
        "userProgress.levelId = level.id AND userProgress.userId = :userId",
        { userId }
      )
      .select([
        "level.id",
        "level.name",
        "level.hasGame",
        "level.icon",
        "userProgress.completed",
        "userProgress.score",
        "userProgress.subLevelsCompleted",
      ])
      .getMany();

    return levels;
  }
}

export default LevelRepository;
