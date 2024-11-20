import { NextFunction, Request, Response } from "express";
import BaseController from "./base/baseController.controller";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import GameService from "../services/game.service";
import { ICreateTriviaDto } from "../dtos/createTrivia.dto";
import { ICreateTrueFalseDto } from "../dtos/createTrueFalse.dto";
import { ICreateVocabularyDto } from "../dtos/createVocabulary.dto";

class GameController extends BaseController {
  public service = new GameService();

  public getSubLevelGames = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { subLevelId } = req.params;
      const games = await this.service.getSubLevelGames(subLevelId);
      if (games) {
        this.sendResponse(res, games, "Games retruned successfully", 200);
      } else {
        this.sendError("error getting games", 404);
      }
    }
  );

  public createTrivia = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { subLevelId } = req.params;
      const game: ICreateTriviaDto = req.body;
      const trivia = await this.service.createTrivia(subLevelId, game);
      if (trivia) {
        this.sendResponse(res, trivia, "Game created successfully", 200);
      } else {
        this.sendError("Error creating game", 404);
      }
    }
  );

  public createTrueFalse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { subLevelId } = req.params;
      const game: ICreateTrueFalseDto = req.body;
      const trueFalse = await this.service.createTrueFalse(subLevelId, game);
      if (trueFalse) {
        this.sendResponse(res, trueFalse, "Game created successfully", 200);
      } else {
        this.sendError("Error creating game", 404);
      }
    }
  );

  public createVocabulary = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { subLevelId } = req.params;
      const game: ICreateVocabularyDto = req.body;
      const vocabulary = await this.service.createVocabulary(subLevelId, game);
      if (vocabulary) {
        this.sendResponse(res, vocabulary, "Game created successfully", 200);
      } else {
        this.sendError("Error creating game", 404);
      }
    }
  );

  public editTrivia = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { gameId } = req.params;
      const {} = req.body;

      const trivia = await this.service.editTrivia(gameId);
      if (trivia) {
        this.sendResponse(res, trivia, "Game update successfully", 200);
      } else {
        this.sendError("Error editing game", 404);
      }
    }
  );

  public editTrueFalse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { gameId } = req.params;
      const {} = req.body;

      const trueFalse = await this.service.editTrueFalse(gameId);
      if (trueFalse) {
        this.sendResponse(res, trueFalse, "Game update successfully", 200);
      } else {
        this.sendError("Error editing game", 404);
      }
    }
  );

  public editVocabulary = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { gameId } = req.params;
      const {} = req.body;

      const vocabulary = await this.service.editVocabulary(gameId);
      if (vocabulary) {
        this.sendResponse(res, vocabulary, "Game update successfully", 200);
      } else {
        this.sendError("Error editing game", 404);
      }
    }
  );

  public deleteGame = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { gameId } = req.params;
      const game = await this.service.deleteGame(gameId);
      if (game) {
        this.sendResponse(res, game, "game deleted succesffully", 200);
      } else {
        this.sendError("Error delete game", 404);
      }
    }
  );
}

export default GameController;
