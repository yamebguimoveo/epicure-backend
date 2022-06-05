import { Router, Request, Response, NextFunction } from "express";
import { IChef } from "../../../db/models/chef.model";
import { ChefHandler } from "../handlers/chef.handler";
import { DishHandler } from "../handlers/dish.handler";
import { RestaurantHandler } from "../handlers/restaurant.handler";

export class HomepageController {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.route("/").get(this.getHomepageData.bind(this));
  }

  async getHomepageData(req: Request, res: Response, next: NextFunction) {
    try {
      const dishHandler = new DishHandler();
      const restaurantHandler = new RestaurantHandler();
      const chefHandler = new ChefHandler();
      let chef: any = await chefHandler.getChefs({ name: "Yoosi Shitrit" });
      console.log(chef);
      const chefRestaurants = await restaurantHandler.getRestaurants({
        chef: chef[0]._id,
      });
      const restaurants = await restaurantHandler.getRestaurants({
        limit: "9",
        page: "1",
      });
      const dishes = await dishHandler.getDishes({
        limit: "9",
        page: "1",
      });
      res.status(200).send({
        status: "success",
        data: {
          chef: { ...chef[0]._doc, restaurants: chefRestaurants },
          restaurants,
          dishes,
        },
      });
    } catch (err) {
      res.status(404).send({
        status: "fail",
        message: "could not get homepage data",
      });
    }
  }
}
