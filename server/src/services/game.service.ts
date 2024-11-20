import { ICreateTriviaDto } from '../dtos/createTrivia.dto';
import { ICreateTrueFalseDto } from '../dtos/createTrueFalse.dto';
import { ICreateVocabularyDto } from '../dtos/createVocabulary.dto';
import { TriviaGame } from '../entities/trivia.entity';
import GameRepository from '../repositories/game.repository';
import TriviaRepository from '../repositories/trivia.repository';
import TrueFalseRepository from '../repositories/trueFalse.repository';
import VocabularyRepository from '../repositories/vocabulary.repository';
import BaseService from './base/baseService.service';

class GameService extends BaseService {
  public repositories: [GameRepository, TriviaRepository, TrueFalseRepository, VocabularyRepository] = [new GameRepository(), new TriviaRepository(), new TrueFalseRepository(), new VocabularyRepository()];

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

  async createTrivia(subLevelId: string, game: ICreateTriviaDto) {
    return null;
  }
  async createTrueFalse(subLevelId: string, game: ICreateTrueFalseDto) {
    return null;
  }
  async createVocabulary(subLevelId: string, game: ICreateVocabularyDto) {
    return null;
  }
  async editTrivia(gameId: string) {
    return null;
  }
  async editTrueFalse(gameId: string) {
    return null;
  }
  async editVocabulary(gameId: string) {
    return null;
  }
  async deleteGame(gameId: string) {
    return null;
  }
}

export default GameService;
