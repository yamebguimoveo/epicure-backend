"use strict";
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
    async getChefs(req, res, next) {
        try {
            const handler = new chef_handler_1.ChefHandler();
            const chefs = await handler.getChefs(req.query);
            res.json({
                status: 200,
                data: { chefs },
            });
        }
        catch (err) {
            res.status(404).json({ status: "fail", message: "could not get chefs" });
        }
    }
    async createChef(req, res, next) {
        try {
            const handler = new chef_handler_1.ChefHandler();
            const chef = await handler.createChef(req.body);
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
    }
    async getChef(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new chef_handler_1.ChefHandler();
            const chef = await handler.getChef(id);
            res.json({
                status: 200,
                data: { chef },
            });
        }
        catch (err) {
            res.status(404).json({ status: "fail", message: "could not get chef" });
        }
    }
    async deleteChef(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new chef_handler_1.ChefHandler();
            const chef = await handler.deleteChef(id);
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
    }
    async updateChef(req, res, next) {
        try {
            const id = req.params.id;
            const handler = new chef_handler_1.ChefHandler();
            const chef = await handler.updateChef(id, req.body);
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
    }
}
exports.ChefController = ChefController;
//# sourceMappingURL=chef.controller.js.map