"use strict";
exports.__esModule = true;
var express_1 = require("express");
var chef_controller_1 = require("./controllers/chef.controller");
var dish_controller_1 = require("./controllers/dish.controller");
var homepage_controller_1 = require("./controllers/homepage.controller");
var restaurant_controller_1 = require("./controllers/restaurant.controller");
var user_controller_1 = require("./controllers/user.controller");
var V1Routes = /** @class */ (function () {
    function V1Routes() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    V1Routes.prototype.initializeRoutes = function () {
        var userController = new user_controller_1.UserController();
        var dishesController = new dish_controller_1.DishController();
        var restaurantsController = new restaurant_controller_1.RestaurantController();
        var chefController = new chef_controller_1.ChefController();
        var homepageController = new homepage_controller_1.HomepageController();
        //AuthController
        // Authentication
        this.router.use("/user", userController.router);
        this.router.use("/homepage", homepageController.router);
        this.router.use("/dishes", dishesController.router);
        this.router.use("/restaurants", restaurantsController.router);
        this.router.use("/chefs", chefController.router);
    };
    return V1Routes;
}());
exports["default"] = V1Routes;
