import { NextFunction, Request, Response } from "express";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}
export const authController = new AuthController();
