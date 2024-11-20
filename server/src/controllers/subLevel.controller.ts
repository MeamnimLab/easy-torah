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

  public getSubLevel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { levelId } = req.params;
      const subLevels = await this.service.getSubLevel(levelId);
      if (subLevels) {
        this.sendResponse(res, subLevels, "sub levels returned successfully", 200);
      } else {
        this.sendError("error getting sub levels", 404);
      }
    }
  );

  public editSubLevel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const {subLevelId} = req.params;
      const {name} = req.body;

      const level = await this.service.editSubLevel(subLevelId, name);
      if (level) {
        this.sendResponse(res, level, "Sub level updated successfully", 200);
      } else {
        this.sendError("Sub level not found", 404);
      }
    }
  );
}

export default SubLevelController;
