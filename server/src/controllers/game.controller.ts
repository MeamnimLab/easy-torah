import { NextFunction, Request, Response } from 'express';
import BaseController from './base/baseController.controller';
import asyncHandler from '../middlewares/asyncHandler.middleware';
import GameService from '../services/game.service';

class GameController extends BaseController {
  public service = new GameService();

  public get = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      this.sendResponse(res, {data: 'hi'}, 'Game retruned successfully', 200);
  });
}

export default GameController;
