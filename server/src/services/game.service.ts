import GameRepository from '../repositories/game.repository';
import BaseService from './base/baseService.service';

class GameService extends BaseService {
  public repositories = [new GameRepository()];

  async getSubLevelGames(subLevelId: string) {
    const games = await this.repositories[0].getSubLevelGames(subLevelId);
    return games;
  }
}

export default GameService;
