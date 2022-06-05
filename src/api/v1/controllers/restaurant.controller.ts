import { Router, Request, Response, NextFunction } from "express";
import { RestaurantHandler } from "../handlers/restaurant.handler";
import { Authenticator } from "../middlewares/authenticator";

export class RestaurantController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router
      .route("/")
      .get(this.getRestaurants.bind(this))
      .post(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.createRestaurant.bind(this)
      );

    this.router
      .route("/:id")
      .get(this.getRestaurant.bind(this))
      .delete(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.deleteRestaurant.bind(this)
      )
      .patch(
        Authenticator.protect,
        Authenticator.restrictToAdmin,
        this.updateRestaurant.bind(this)
      );
  }

  async getRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new RestaurantHandler();
      const restaurants = await handler.getRestaurants(req.query);
      res.status(200).json({
        status: "success",
        data: { restaurants },
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "could not get restaurants" });
    }
  }

  async createRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const handler = new RestaurantHandler();
      const restaurant = await handler.createRestaurant(req.body);
      res.status(201).json({
        status: "success",
        data: { restaurant },
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: "fail", message: "could not create restaurant" });
    }
  }

  async getRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new RestaurantHandler();
      const restaurant = await handler.getRestaurant(id);
      res.status(200).json({
        status: "success",
        data: { restaurant },
      });
    } catch (err) {
      res
        .status(404)
        .json({ status: "fail", message: "could not get restaurant" });
    }
  }

  async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new RestaurantHandler();
      await handler.deleteRestaurant(id);
      res.status(200).json({
        status: "success",
        data: { restaurant: id },
      });
    } catch (err) {
      res
        .status(404)
        .json({ status: "fail", message: "could not delete restaurant" });
    }
  }

  async updateRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const handler = new RestaurantHandler();
      const restaurant = await handler.updateRestaurant(id, req.body);
      res.status(200).json({
        status: "success",
        data: { restaurant },
      });
    } catch (err) {
      res
        .status(404)
        .json({ status: "fail", message: "could not update restaurant" });
    }
  }
}
