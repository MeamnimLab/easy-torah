import { Repository } from 'typeorm';
import BaseRepository from './base/baseRepository.repository';
import { TriviaGame } from '../entities/trivia.entity';

class TriviaRepository extends BaseRepository<TriviaGame> {
    protected repository!: Repository<TriviaGame>;
    protected relations: string[] = [];
  
    constructor() {
      super(TriviaGame);
    }
  }
  
  export default TriviaRepository;