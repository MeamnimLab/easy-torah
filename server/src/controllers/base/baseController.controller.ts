import { Response } from 'express';
import BaseService from '../../services/base/baseService.service';

abstract class BaseController {
  public abstract service: BaseService;

  protected sendResponse(res: Response, data: any, message: string, statusCode: number): void {
    res.status(statusCode).json({ data, message });
  }

  protected sendFile(res: Response, filePath: string, headers: Record<string, string>, callback: () => void): void {
    res.sendFile(filePath, { headers }, callback);
  }

  protected sendError(message: string, statusCode: number): void {
    throw {statusCode, message};
  }
}

export default BaseController;
