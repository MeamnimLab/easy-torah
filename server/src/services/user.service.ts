import { HttpException } from '../controllers/base/baseController.controller';
import { ICreateUserDto } from '../dtos/createUser.dto';
import User from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import UserRepository from '../repositories/user.repository';
import BaseService from './base/baseService.service';

class UserService extends BaseService {
  public repositories = [new UserRepository()];

  public async createUser(userData: ICreateUserDto): Promise<IUser> {
    const newUser: User = new User(userData);

    return await this.repositories[0].save(newUser);
  }

  public async getAllUsers(): Promise<IUser[]> {
      return await this.repositories[0].findAll();
  }
}

export default UserService;
