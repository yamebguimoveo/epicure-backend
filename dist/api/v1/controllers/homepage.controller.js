"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageController = void 0;
const express_1 = require("express");
const chef_handler_1 = require("../handlers/chef.handler");
const dish_handler_1 = require("../handlers/dish.handler");
const restaurant_handler_1 = require("../handlers/restaurant.handler");
class HomepageController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route("/").get(this.getHomepageData.bind(this));
    }
    async getHomepageData(req, res, next) {
        try {
            const dishHandler = new dish_handler_1.DishHandler();
            const restaurantHandler = new restaurant_handler_1.RestaurantHandler();
            const chefHandler = new chef_handler_1.ChefHandler();
            let chef = await chefHandler.getChefs({ name: "Yossi Shitrit" });
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
                    chef: Object.assign(Object.assign({}, chef[0]._doc), { restaurants: chefRestaurants }),
                    restaurants,
                    dishes,
                },
            });
        }
        catch (err) {
            res.status(404).send({
                status: "fail",
                message: "could not get homepage data",
            });
        }
    }
}
exports.HomepageController = HomepageController;
//# sourceMappingURL=homepage.controller.js.map