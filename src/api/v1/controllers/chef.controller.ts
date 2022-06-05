import { Router, Request, Response, NextFunction } from "express";
import { ChefHandler } from "../handlers/chef.handler";
import { Authenticator } from "../middlewares/authenticator";

export class ChefController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router
      .route("/")
      .get(this.getChefs.bind(this))
      .post(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.createChef.bind(this)
      );

    this.router
      .route("/:id")
      .get(this.getChef.bind(this))
      .delete(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.deleteChef.bind(this)
      )
      .patch(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.updateChef.bind(this)
      );
  }

  async getChefs(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new ChefHandler();
      const chefs = await handler.getChefs(req.query);
      res.json({
        status: 200,
        data: { chefs },
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: "could not get chefs" });
    }
  }

  async createChef(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new ChefHandler();
      const chef = await handler.createChef(req.body);
      res.json({
        status: 200,
        data: { chef },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: "could not create chef",
      });
    }
  }

  async getChef(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new ChefHandler();
      const chef = await handler.getChef(id);
      res.json({
        status: 200,
        data: { chef },
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: "could not get chef" });
    }
  }

  async deleteChef(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new ChefHandler();
      const chef = await handler.deleteChef(id);
      res.json({
        status: 200,
        data: { chef },
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "could not delete chef" });
    }
  }

  async updateChef(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new ChefHandler();
      const chef = await handler.updateChef(id, req.body);
      res.json({
        status: 200,
        data: { chef },
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "could not update chef" });
    }
  }
}
