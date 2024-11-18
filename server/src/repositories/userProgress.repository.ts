import { Repository } from "typeorm";
import BaseRepository from "./base/baseRepository.repository";
import UserProgress from "../entities/userProgress.entity";

class UserProgressRepository extends BaseRepository<UserProgress> {
  protected repository!: Repository<UserProgress>;
  protected relations: string[] = [];

  constructor() {
    super(UserProgress);
  }
}

export default UserProgressRepository;
