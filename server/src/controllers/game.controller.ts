import { NextFunction, Request, Response } from 'express';
import BaseController from './base/baseController.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import GameService from '../services/game.service';

class GameController extends BaseController {
  public service = new GameService();

  public getSubLevelGames = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { subLevelId } = req.params;
      const games = await this.service.getSubLevelGames(subLevelId);
      if (games) {
        this.sendResponse(res, games, "Games retruned successfully", 200);
      } else {
        this.sendError("error getting games", 404);
      }  
  });
}

export default GameController;
