import { RouteDefinition, RouterMethod } from '../types/routeDefinition.type';
import UserController from '../controllers/user.controller';
import { BaseRoutes } from './base/baseRoutes.route';

class UserRoute extends BaseRoutes {
  public basePath: string = '/api/user';
  public controller!: UserController;

  constructor() {
    super(new UserController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [
      [RouterMethod.POST, '/', [this.controller.createUser]],
      [RouterMethod.GET, '/', [this.controller.findAll]],
    ];
  }
}

export default UserRoute;
