import { ObjectLiteral } from 'typeorm';
import BaseRepository from '../../repositories/base/baseRepository.repository';

abstract class BaseService {
  protected abstract repositories: BaseRepository<ObjectLiteral>[];
}

export default BaseService;
