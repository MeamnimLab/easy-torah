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
        this.sendResponse(res, levels, "Game retruned successfully", 200);
      } else {
        this.sendError("error getting levels", 404);
      }
    }
  );
}

export default LevelController;
