import express, { Router } from "express";
import { ChefController } from "./controllers/chef.controller";
import { DishController } from "./controllers/dish.controller";
import { HomepageController } from "./controllers/homepage.controller";
import { RestaurantController } from "./controllers/restaurant.controller";
import { UserController } from "./controllers/user.controller";

class V1Routes {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userController= new UserController();
    const dishesController = new DishController();
    const restaurantsController = new RestaurantController();
    const chefController = new ChefController();
    const homepageController = new HomepageController();
    //AuthController

    // Authentication
    this.router.use("/user", userController.router)
    this.router.use("/homepage", homepageController.router);
    this.router.use("/dishes", dishesController.router);
    this.router.use("/restaurants", restaurantsController.router);
    this.router.use("/chefs", chefController.router);
  }
}

export default V1Routes;
