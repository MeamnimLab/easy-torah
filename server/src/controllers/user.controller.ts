import { NextFunction, Request, Response } from "express";
import BaseController from "./base/baseController.controller";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import User from "../entities/user.entity";
import UserService from "../services/user.service";
import { ICreateUserDto } from "../dtos/createUser.dto";
import { IUser } from "../interfaces/user.interface";

class UserController extends BaseController {
  public service = new UserService();

  public createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userData: ICreateUserDto = req.body;

      const createUser: IUser = await this.service.createUser(userData);

      if (createUser) {
        this.sendResponse(res, createUser, "Ok", 200);
      } else {
        this.sendError("user not found", 404);
      }
    }
  );

  public findAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const users: IUser[] = await this.service.getAllUsers();

      if (users) {
        this.sendResponse(res, users, "All users", 200);
      } else {
        this.sendError("No users found", 404);
      }
    }
  );
}

export default UserController;
