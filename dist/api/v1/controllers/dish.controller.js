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
    getDishes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new dish_handler_1.DishHandler();
                const dishes = yield handler.getDishes(req.query);
                res.status(200).json({
                    status: 'success',
                    data: { dishes },
                });
            }
            catch (err) {
                res.status(404).json({ status: "fail", message: "could not get dishes" });
            }
        });
    }
    createDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new dish_handler_1.DishHandler();
                const dish = yield handler.createDish(req.body);
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
        });
    }
    getDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new dish_handler_1.DishHandler();
                const dish = yield handler.getDish(id);
                res.status(200).json({
                    status: 'success',
                    data: { dish },
                });
            }
            catch (err) {
                res.status(404).json({ status: "fail", message: "could not get dish" });
            }
        });
    }
    deleteDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new dish_handler_1.DishHandler();
                const dish = yield handler.deleteDish(id);
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
        });
    }
    updateDish(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new dish_handler_1.DishHandler();
                const dish = yield handler.updateDish(id, req.body);
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
        });
    }
}
exports.DishController = DishController;
//# sourceMappingURL=dish.controller.js.map