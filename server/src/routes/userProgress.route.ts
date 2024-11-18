import UserProgressController from '../controllers/userProgress.controller';
import { RouteDefinition, RouterMethod } from '../types/routeDefinition.type';
import { BaseRoutes } from './base/baseRoutes.route';

class UserProgressRoute extends BaseRoutes {
  public basePath: string = '/api/userProgress';
  public controller!: UserProgressController;

  constructor() {
    super(new UserProgressController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [
      [RouterMethod.POST, '/:userId/:subLevelId', [this.controller.createUserProgress]],
    ];
  }
}

export default UserProgressRoute;
