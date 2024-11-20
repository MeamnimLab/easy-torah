import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import LevelService from "../services/level.service";
import BaseController from "./base/baseController.controller";

class LevelController extends BaseController {
  public service = new LevelService();

  public getLevelsWithProgress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId } = req.params;
      const levels = await this.service.getLevelsWithProgress(userId);
      if (levels) {
        this.sendResponse(res, levels, "Levels retruned successfully", 200);
      } else {
        this.sendError("error getting levels", 404);
      }
    }
  );

  public getAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const levels = await this.service.getAll();
      if (levels) {
        this.sendResponse(res, levels, "Levels retruned successfully", 200);
      } else {
        this.sendError("error getting levels", 404);
      }
    }
  );


  public editLevel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {levelId} = req.params;
      const {name, icon} = req.body;

      const level = await this.service.editLevel(levelId, name, icon);
      if (level) {
        this.sendResponse(res, level, "Level updated successfully", 200);
      } else {
        this.sendError("Level not found", 404);
      }
    }
  );
}

export default LevelController;
