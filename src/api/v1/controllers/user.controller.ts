import express, { Router, Request, Response, NextFunction } from "express";
import { UserHandler } from "../handlers/user.handler";
import { Authenticator } from "../middlewares/authenticator";

export class UserController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.route("/signup").post(this.signup);
    this.router.route("/login").post(this.login);
    this.router.route("/users").get(Authenticator.protect, this.getUsers);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new UserHandler();
      const user = await handler.signup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.status(201).json({
        status: "success",
        user,
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: "could not signup" });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new UserHandler();
      const { email, password } = req.body;
      const { token, user } = await handler.login({ email, password });
      res.status(200).json({ status: "success", token, user });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new UserHandler();
      const users = await handler.getUsers(req.query);
      res.status(200).json({
        status: "success",
        data: { users },
      });
    } catch (err) {
      return res.status(400).json({ status: "fail", message: err });
    }
  }
}
