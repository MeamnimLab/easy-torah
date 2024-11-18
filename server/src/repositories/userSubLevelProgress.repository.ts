import { Repository } from "typeorm";
import UserSubLevelProgress from "../entities/userSubLevelProgress.entity";
import BaseRepository from "./base/baseRepository.repository";

class UserSubLevelProgressRepository extends BaseRepository<UserSubLevelProgress> {
    protected repository!: Repository<UserSubLevelProgress>;
    protected relations: string[] = [];
  
    constructor() {
      super(UserSubLevelProgress);
    }

    public async findOne(userId: number, subLevelId: number): Promise<any> {
        return await this.repository.findOne({
            where: { user: { id: userId }, subLevel: { id: subLevelId } },
          })
    }
  }
  
  export default UserSubLevelProgressRepository;