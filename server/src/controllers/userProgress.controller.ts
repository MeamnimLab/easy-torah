import { NextFunction, Request, Response } from "express";
import BaseController from "./base/baseController.controller";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import UserProgressService from "../services/userProgress.service";

class UserProgressController extends BaseController {
  public service = new UserProgressService();

  public createUserProgress = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId, subLevelId } = req.params;

      const createUserProgress = await this.service.createUserProgress(
        userId,
        subLevelId
      );

      if (createUserProgress) {
        this.sendResponse(res, createUserProgress, "Ok", 200);
      } else {
        this.sendError("userProgress not found", 404);
      }
    }
  );

  public finishSubLevel = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { userId, subLevelId } = req.params;
      const { score } = req.body;
      console.log(userId, subLevelId, score)

      const finishSubLevel = await this.service.finishSubLevel(
        userId,
        subLevelId,
        score
      );

      console.log(finishSubLevel)

      if (finishSubLevel) {
        this.sendResponse(res, finishSubLevel, "Ok", 200);
      } else {
        this.sendError("finishSubLevel not found", 404);
      }
    }
  );
}

export default UserProgressController;
