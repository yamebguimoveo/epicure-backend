"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getHomepageData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dishHandler = new dish_handler_1.DishHandler();
                const restaurantHandler = new restaurant_handler_1.RestaurantHandler();
                const chefHandler = new chef_handler_1.ChefHandler();
                let chef = yield chefHandler.getChefs({ name: "Yoosi Shitrit" });
                console.log(chef);
                const chefRestaurants = yield restaurantHandler.getRestaurants({
                    chef: chef[0]._id,
                });
                const restaurants = yield restaurantHandler.getRestaurants({
                    limit: "9",
                    page: "1",
                });
                const dishes = yield dishHandler.getDishes({
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
        });
    }
}
exports.HomepageController = HomepageController;
//# sourceMappingURL=homepage.controller.js.map