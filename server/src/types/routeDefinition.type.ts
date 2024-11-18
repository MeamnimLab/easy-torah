import { Request, Response, NextFunction } from 'express';
export enum RouterMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch"
}
export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;
export type RouteDefinition = [RouterMethod, string, RouteHandler[]];
