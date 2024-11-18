import { RouteDefinition, RouterMethod } from '../types/routeDefinition.type';
import { BaseRoutes } from './base/baseRoutes.route';
import GameController from '../controllers/game.controller';

class GameRoute extends BaseRoutes {
  public basePath: string = '/api/game';
  public controller!: GameController;

  constructor() {
    super(new GameController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [[RouterMethod.GET, '/', [this.controller.get]]];
  }
}

export default GameRoute;
