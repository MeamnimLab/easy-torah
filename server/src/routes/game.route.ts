import { RouteDefinition, RouterMethod } from "../types/routeDefinition.type";
import { BaseRoutes } from "./base/baseRoutes.route";
import GameController from "../controllers/game.controller";

class GameRoute extends BaseRoutes {
  public basePath: string = "/api/game";
  public controller!: GameController;

  constructor() {
    super(new GameController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [
      [RouterMethod.GET, "/:subLevelId", [this.controller.getSubLevelGames]],
      [RouterMethod.POST, "/trivia/:subLevelId", [this.controller.createTrivia]],
      [RouterMethod.POST, "/trueFalse/:subLevelId", [this.controller.createTrueFalse]],
      [RouterMethod.POST, "/vocabulary/:subLevelId", [this.controller.createVocabulary]],
      [RouterMethod.PATCH, "/trivia/:gameId", [this.controller.editTrivia]],
      [RouterMethod.PATCH, "/trueFalse/:gameId", [this.controller.editTrueFalse]],
      [RouterMethod.PATCH, "/vocabulary/:gameId", [this.controller.editVocabulary]],
      [RouterMethod.DELETE, "/:gameId", [this.controller.deleteGame]],
    ];
  }
}

export default GameRoute;
