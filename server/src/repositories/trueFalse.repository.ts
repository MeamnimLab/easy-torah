import { Repository } from 'typeorm';
import BaseRepository from './base/baseRepository.repository';
import { TrueFalseGame } from '../entities/trueFalse.entity';

class TrueFalseRepository extends BaseRepository<TrueFalseGame> {
    protected repository!: Repository<TrueFalseGame>;
    protected relations: string[] = [];
  
    constructor() {
      super(TrueFalseGame);
    }
  }
  
  export default TrueFalseRepository;