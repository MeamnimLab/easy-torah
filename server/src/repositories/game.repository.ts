import { Repository } from "typeorm";
import BaseRepository from "./base/baseRepository.repository";
import { Game } from "../entities/game.entity";

class GameRepository extends BaseRepository<Game> {
  protected repository!: Repository<Game>;
  protected relations: string[] = [];

  constructor() {
    super(Game);
  }

  public async getSubLevelGames(subLevelId: string): Promise<any> {
    const games = await this.repository
      .createQueryBuilder("game")
      .where("CAST(game.id AS TEXT) LIKE :subLevelId", {
        subLevelId: `${subLevelId}%`,
      })
      .getMany();

    return games;
  }
}

export default GameRepository;
