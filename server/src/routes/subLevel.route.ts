import SubLevelController from "../controllers/subLevel.controller";
import { RouteDefinition, RouterMethod } from "../types/routeDefinition.type";
import { BaseRoutes } from "./base/baseRoutes.route";

class SubLevelRoute extends BaseRoutes {
  public basePath: string = "/api/subLevel";
  public controller!: SubLevelController;

  constructor() {
    super(new SubLevelController());
  }

  protected defineRoutes(): RouteDefinition[] {
    return [
      [
        RouterMethod.GET,
        "/getSubLevelsWithProgress/:userId/:levelId",
        [this.controller.getSubLevelsWithProgress],
      ],
      [
        RouterMethod.GET,
        "/:levelId",
        [this.controller.getSubLevel],
      ],
      [
        RouterMethod.PATCH,
        "/:subLevelId",
        [this.controller.editSubLevel],
      ],
    ];
  }
}

export default SubLevelRoute;
