import {
  DeleteResult,
  EntityTarget,
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  FindOptionsWhereProperty
} from 'typeorm';
import { AppDataSource } from '../../databases/dataSource';

abstract class BaseRepository<Entity extends ObjectLiteral> {
  protected abstract repository: Repository<Entity>;
  protected abstract relations: string[];

  constructor(entity: EntityTarget<Entity>) {
    (async () => {
      try {
        this.repository = AppDataSource.getRepository(entity);
      } catch (error) {
        console.error('Error initializing repository:', error);
      }
    })();
  }

  public async save(entity: Entity): Promise<Entity> {
    return await this.repository.save(entity);
  }

  public async findAll(): Promise<Entity[]> {
    return await this.repository.find({ relations: this.relations });
  }

  public async findById(id: FindOptionsWhereProperty<NonNullable<Entity>, number | string>): Promise<Entity | null> {
    const where: FindOptionsWhere<Entity> = {
      id
    } as unknown as FindOptionsWhere<Entity>;
    return await this.repository.findOne({ where, relations: this.relations });
  }

  public async delete(id: FindOptionsWhereProperty<NonNullable<Entity>, number | string>): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  public async remove(entity: Entity): Promise<Entity> {
    return await this.repository.remove(entity);
  }

  // public async find1(): Promise<any> {
  //   return await this.repository.find({
  //     relations: ["subLevels"],
  //   });
  // }

  // public async find2(userId: any): Promise<any> {
  //   const where: FindOptionsWhere<Entity> = {
  //   } as unknown as FindOptionsWhere<Entity>;
  //   return await this.repository.find({
  //       where: { user: { id: userId } },
  //       relations: ['level'],
  //   });
  // }
}

export default BaseRepository;
