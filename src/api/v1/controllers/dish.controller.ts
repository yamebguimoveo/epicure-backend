import express, { Router, Request, Response, NextFunction } from "express";
import { DishHandler } from "../handlers/dish.handler";
import { Authenticator } from "../middlewares/authenticator";

export class DishController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router
      .route("/")
      .get(this.getDishes.bind(this))
      .post(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.createDish.bind(this)
      );

    this.router
      .route("/:id")
      .get(this.getDish.bind(this))
      .delete(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.deleteDish.bind(this)
      )
      .patch(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.updateDish.bind(this)
      );
  }

  async getDishes(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new DishHandler();
      const dishes = await handler.getDishes(req.query);
      res.status(200).json({
        status: 'success',
        data: { dishes },
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: "could not get dishes" });
    }
  }

  async createDish(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new DishHandler();
      const dish = await handler.createDish(req.body);
      res.status(201).json({
        status: 'success',
        data: { dish },
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "could not create dish" });
    }
  }

  async getDish(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new DishHandler();
      const dish = await handler.getDish(id);
      res.status(200).json({
        status: 'success',
        data: { dish },
      });
    } catch (err) {
      res.status(404).json({ status: "fail", message: "could not get dish" });
    }
  }

  async deleteDish(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new DishHandler();
      const dish = await handler.deleteDish(id);
      res.status(204).json({
        status: 'success',
        data: { dish },
      });
    } catch (err) {
      res
        .status(404)
        .json({ status: "fail", message: "could not delete dish" });
    }
  }

  async updateDish(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new DishHandler();
      const dish = await handler.updateDish(id, req.body);
      res.json({
        status: 200,
        data: { dish },
      });
    } catch (err) {
      res
        .status(404)
        .json({ status: "fail", message: "could not update dish" });
    }
  }
}
