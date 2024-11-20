import LevelController from "../controllers/level.controller";
import { RouteDefinition, RouterMethod } from "../types/routeDefinition.type";
import { BaseRoutes } from "./base/baseRoutes.route";

class LevelRoute extends BaseRoutes {
  public basePath: string = "/api/level";
  public controller!: LevelController;

  constructor() {
    super(new LevelController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [
      [
        RouterMethod.GET,
        "/getLevelsWithProgress/:userId",
        [this.controller.getLevelsWithProgress],
      ],
      [
        RouterMethod.GET,
        "/",
        [this.controller.getAll],
      ],
      [
        RouterMethod.PATCH,
        "/:levelId",
        [this.controller.editLevel],
      ],
    ];
  }
}

export default LevelRoute;
