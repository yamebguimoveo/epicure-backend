"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chef_controller_1 = require("./controllers/chef.controller");
const dish_controller_1 = require("./controllers/dish.controller");
const homepage_controller_1 = require("./controllers/homepage.controller");
const restaurant_controller_1 = require("./controllers/restaurant.controller");
const user_controller_1 = require("./controllers/user.controller");
class V1Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const userController = new user_controller_1.UserController();
        const dishesController = new dish_controller_1.DishController();
        const restaurantsController = new restaurant_controller_1.RestaurantController();
        const chefController = new chef_controller_1.ChefController();
        const homepageController = new homepage_controller_1.HomepageController();
        //AuthController
        // Authentication
        this.router.use("/user", userController.router);
        this.router.use("/homepage", homepageController.router);
        this.router.use("/dishes", dishesController.router);
        this.router.use("/restaurants", restaurantsController.router);
        this.router.use("/chefs", chefController.router);
    }
}
exports.default = V1Routes;
//# sourceMappingURL=v1.routes.js.map