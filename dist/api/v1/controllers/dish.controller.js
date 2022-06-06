"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishController = void 0;
const express_1 = require("express");
const dish_handler_1 = require("../handlers/dish.handler");
const authenticator_1 = require("../middlewares/authenticator");
class DishController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(this.getDishes.bind(this))
            .post(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.createDish.bind(this));
        this.router
            .route("/:id")
            .get(this.getDish.bind(this))
            .delete(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.deleteDish.bind(this))
            .patch(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.updateDish.bind(this));
    }
    async getDishes(req, res, next) {
        try {
            const handler = new dish_handler_1.DishHandler();
            const dishes = await handler.getDishes(req.query);
            res.status(200).json({
                status: 'success',
                data: { dishes },
            });
        }
        catch (err) {
            res.status(404).json({ status: "fail", message: "could not get dishes" });
        }
    }
    async createDish(req, res, next) {
        try {
            const handler = new dish_handler_1.DishHandler();
            const dish = await handler.createDish(req.body);
            res.status(201).json({
                status: 'success',
                data: { dish },
            });
        }
        catch (err) {
            res
                .status(400)
                .json({ status: "fail", message: "could not create dish" });
        }
    }
    async getDish(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new dish_handler_1.DishHandler();
            const dish = await handler.getDish(id);
            res.status(200).json({
                status: 'success',
                data: { dish },
            });
        }
        catch (err) {
            res.status(404).json({ status: "fail", message: "could not get dish" });
        }
    }
    async deleteDish(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new dish_handler_1.DishHandler();
            const dish = await handler.deleteDish(id);
            res.status(204).json({
                status: 'success',
                data: { dish },
            });
        }
        catch (err) {
            res
                .status(404)
                .json({ status: "fail", message: "could not delete dish" });
        }
    }
    async updateDish(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new dish_handler_1.DishHandler();
            const dish = await handler.updateDish(id, req.body);
            res.json({
                status: 200,
                data: { dish },
            });
        }
        catch (err) {
            res
                .status(404)
                .json({ status: "fail", message: "could not update dish" });
        }
    }
}
exports.DishController = DishController;
//# sourceMappingURL=dish.controller.js.map