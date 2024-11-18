import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import SubLevelService from "../services/subLevel.service";
import BaseController from "./base/baseController.controller";

class SubLevelController extends BaseController {
  public service = new SubLevelService();

  public getSubLevelsWithProgress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId, levelId } = req.params;
      const subLevels = await this.service.getSubLevelsWithProgress(userId, levelId);
      if (subLevels) {
        this.sendResponse(res, subLevels, "sub levels returned successfully", 200);
      } else {
        this.sendError("error getting sub levels", 404);
      }
    }
  );
}

export default SubLevelController;
