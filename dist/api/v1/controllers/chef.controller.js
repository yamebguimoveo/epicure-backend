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
exports.ChefController = void 0;
const express_1 = require("express");
const chef_handler_1 = require("../handlers/chef.handler");
const authenticator_1 = require("../middlewares/authenticator");
class ChefController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(this.getChefs.bind(this))
            .post(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.createChef.bind(this));
        this.router
            .route("/:id")
            .get(this.getChef.bind(this))
            .delete(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.deleteChef.bind(this))
            .patch(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.updateChef.bind(this));
    }
    getChefs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new chef_handler_1.ChefHandler();
                const chefs = yield handler.getChefs(req.query);
                res.json({
                    status: 200,
                    data: { chefs },
                });
            }
            catch (err) {
                res.status(404).json({ status: "fail", message: "could not get chefs" });
            }
        });
    }
    createChef(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const handler = new chef_handler_1.ChefHandler();
                const chef = yield handler.createChef(req.body);
                res.json({
                    status: 200,
                    data: { chef },
                });
            }
            catch (err) {
                res.status(400).json({
                    status: "fail",
                    message: "could not create chef",
                });
            }
        });
    }
    getChef(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new chef_handler_1.ChefHandler();
                const chef = yield handler.getChef(id);
                res.json({
                    status: 200,
                    data: { chef },
                });
            }
            catch (err) {
                res.status(404).json({ status: "fail", message: "could not get chef" });
            }
        });
    }
    deleteChef(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new chef_handler_1.ChefHandler();
                const chef = yield handler.deleteChef(id);
                res.json({
                    status: 200,
                    data: { chef },
                });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ status: "fail", message: "could not delete chef" });
            }
        });
    }
    updateChef(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const handler = new chef_handler_1.ChefHandler();
                const chef = yield handler.updateChef(id, req.body);
                res.json({
                    status: 200,
                    data: { chef },
                });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ status: "fail", message: "could not update chef" });
            }
        });
    }
}
exports.ChefController = ChefController;
//# sourceMappingURL=chef.controller.js.map