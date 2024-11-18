import { Repository } from "typeorm";
import BaseRepository from "./base/baseRepository.repository";
import UserProgress from "../entities/userProgress.entity";

class UserProgressRepository extends BaseRepository<UserProgress> {
  protected repository!: Repository<UserProgress>;
  protected relations: string[] = [];

  constructor() {
    super(UserProgress);
  }

  public async findUserProgress(userId: number, subLevelId: number): Promise<any> {
      return await this.repository.findOne({
        where: { user: { id: userId }, level: { subLevels: { id: subLevelId } } },
        relations: ["level", "user", "subLevelsProgress"],
      })
  }
}

export default UserProgressRepository;
