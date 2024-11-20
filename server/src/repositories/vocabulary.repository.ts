import { Repository } from 'typeorm';
import BaseRepository from './base/baseRepository.repository';
import { VocabularyGame } from '../entities/vocabulary.entity';

class VocabularyRepository extends BaseRepository<VocabularyGame> {
  protected repository!: Repository<VocabularyGame>;
  protected relations: string[] = [];

  constructor() {
    super(VocabularyGame);
  }
}

export default VocabularyRepository;