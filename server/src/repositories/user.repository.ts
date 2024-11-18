import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import BaseRepository from './base/baseRepository.repository';

class UserRepository extends BaseRepository<User> {
  protected repository!: Repository<User>;
  protected relations: string[] = [];

  constructor() {
    super(User);
  }
}

export default UserRepository;
