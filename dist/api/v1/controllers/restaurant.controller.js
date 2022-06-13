"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const express_1 = require("express");
const restaurant_handler_1 = require("../handlers/restaurant.handler");
const authenticator_1 = require("../middlewares/authenticator");
class RestaurantController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/updateAvailablity")
            .get(this.updateRestaurantsAvailable.bind(this));
        this.router
            .route("/")
            .get(this.getRestaurants.bind(this))
            .post(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.createRestaurant.bind(this));
        this.router
            .route("/:id")
            .get(this.getRestaurant.bind(this))
            .delete(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.deleteRestaurant.bind(this))
            .patch(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.updateRestaurant.bind(this));
    }
    async updateRestaurantsAvailable(req, res, next) {
        try {
            const handler = new restaurant_handler_1.RestaurantHandler();
            const openIds = await handler.updateRestaurantAvailavle();
            res.status(200).json({
                status: "success",
                openIds,
            });
        }
        catch (err) {
            res.status(400).json({
                status: "fail",
                message: "could not refresh open restaurants",
            });
        }
    }
    async getRestaurants(req, res, next) {
        try {
            const handler = new restaurant_handler_1.RestaurantHandler();
            const { restaurants, count } = await handler.getRestaurants(req.query);
            res.status(200).json({
                status: "success",
                data: { restaurants, count },
            });
        }
        catch (err) {
            res
                .status(400)
                .json({ status: "fail", message: "could not get restaurants" });
        }
    }
    async createRestaurant(req, res, next) {
        try {
            const handler = new restaurant_handler_1.RestaurantHandler();
            const restaurant = await handler.createRestaurant(req.body);
            res.status(201).json({
                status: "success",
                data: { restaurant },
            });
        }
        catch (err) {
            res
                .status(400)
                .json({ status: "fail", message: "could not create restaurant" });
        }
    }
    async getRestaurant(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new restaurant_handler_1.RestaurantHandler();
            const restaurant = await handler.getRestaurant(id);
            res.status(200).json({
                status: "success",
                data: { restaurant },
            });
        }
        catch (err) {
            res
                .status(404)
                .json({ status: "fail", message: "could not get restaurant" });
        }
    }
    async deleteRestaurant(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new restaurant_handler_1.RestaurantHandler();
            await handler.deleteRestaurant(id);
            res.status(200).json({
                status: "success",
                data: { restaurant: id },
            });
        }
        catch (err) {
            res
                .status(404)
                .json({ status: "fail", message: "could not delete restaurant" });
        }
    }
    async updateRestaurant(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new restaurant_handler_1.RestaurantHandler();
            const restaurant = await handler.updateRestaurant(id, req.body);
            res.status(200).json({
                status: "success",
                data: { restaurant },
            });
        }
        catch (err) {
            res
                .status(404)
                .json({ status: "fail", message: "could not update restaurant" });
        }
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map