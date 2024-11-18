import GameRepository from '../repositories/game.repository';
import BaseService from './base/baseService.service';

class GameService extends BaseService {
  public repositories = [new GameRepository()];

  async getSubLevelGames(subLevelId: string) {
    const games = await this.repositories[0].getSubLevelGames(subLevelId);
    const transformedGames = games.map((game: any) => {
      const { id, type } = game;
      let data = null;

      if (type === "trivia" && game.triviaGames.length > 0) {
        data = game.triviaGames[0];
      } else if (type === "trueFalse" && game.trueFalseGames.length > 0) {
        data = game.trueFalseGames[0];
      } else if (type === "vocabulary" && game.vocabularyGames.length > 0) {
        data = game.vocabularyGames[0];
      }

      return { id, type, ...data };
    });

    return transformedGames;
  }
}

export default GameService;
