import { Router } from 'express';
import { RouteDefinition, RouteHandler } from '../../types/routeDefinition.type';
import BaseController from '../../controllers/base/baseController.controller';

export abstract class BaseRoutes {
  public router: Router = Router();
  public abstract basePath: string;
  public controller: BaseController;
  protected abstract defineRoutes(): RouteDefinition[];

  constructor(controller: BaseController) {
    this.controller = controller;
    this.initializeRoutes(this.defineRoutes());
  }

  protected initializeRoutes(routesList: RouteDefinition[]): void {
    routesList.forEach(([method, path, handlers]) => {
      if (handlers.length) {
        const boundHandlers: RouteHandler[] = handlers.map((handler) => handler.bind(this.controller));
        this.router[method](path, ...boundHandlers);
      }
    });
  }
}
