import { Request, Response, NextFunction } from "express";
import { AuthHandler } from "../handlers/auth.handler";
import { UserHandler } from "../handlers/user.handler";

declare module "express-serve-static-core" {
  interface Request {
    user?: { email: string; admin: boolean; name: string };
  }
  interface Response {
    user?: { email: string; admin: boolean; name: string };
  }
}

export class Authenticator {
  public static async protect(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new AuthHandler();
      const userHandler = new UserHandler();
      const { authorization } = req.headers;
      //jwt payload return from verify ({email,name})
      const { email } = await handler.verify(authorization);
      const existUser = await userHandler.checkIfUserExists(email);
      if (!existUser) throw { message: "User does not exist anymore" };
      req.user = existUser;
      next();
    } catch (error) {
      res.status(403).json({
        status: "fail",
        error,
      });
    }
  }

  public static async restrictToAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user!.admin) {
        throw "User is not admin";
      }
      next();
    } catch (error) {
      res.status(403).json({
        status: "fail",
        message: error,
      });
    }
  }
}
