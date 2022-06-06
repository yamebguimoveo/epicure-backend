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
            .route("/")
            .get(this.getRestaurants.bind(this))
            .post(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.createRestaurant.bind(this));
        this.router
            .route("/:id")
            .get(this.getRestaurant.bind(this))
            .delete(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.deleteRestaurant.bind(this))
            .patch(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.updateRestaurant.bind(this));
    }
    getRestaurants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new restaurant_handler_1.RestaurantHandler();
                const restaurants = yield handler.getRestaurants(req.query);
                res.status(200).json({
                    status: "success",
                    data: { restaurants },
                });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ status: "fail", message: "could not get restaurants" });
            }
        });
    }
    createRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new restaurant_handler_1.RestaurantHandler();
                const restaurant = yield handler.createRestaurant(req.body);
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
        });
    }
    getRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new restaurant_handler_1.RestaurantHandler();
                const restaurant = yield handler.getRestaurant(id);
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
        });
    }
    deleteRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new restaurant_handler_1.RestaurantHandler();
                yield handler.deleteRestaurant(id);
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
        });
    }
    updateRestaurant(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new restaurant_handler_1.RestaurantHandler();
                const restaurant = yield handler.updateRestaurant(id, req.body);
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
        });
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map