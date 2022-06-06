"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const user_handler_1 = require("../handlers/user.handler");
const authenticator_1 = require("../middlewares/authenticator");
class UserController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route("/signup").post(this.signup);
        this.router.route("/login").post(this.login);
        this.router.route("/users").get(authenticator_1.Authenticator.protect, this.getUsers);
    }
    async signup(req, res, next) {
        try {
            const handler = new user_handler_1.UserHandler();
            const user = await handler.signup({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            res.status(201).json({
                status: "success",
                user,
            });
        }
        catch (err) {
            res.status(404).json({ status: "fail", message: "could not signup" });
        }
    }
    async login(req, res, next) {
        try {
            const handler = new user_handler_1.UserHandler();
            const { email, password } = req.body;
            const { token, user } = await handler.login({ email, password });
            res.status(200).json({ status: "success", token, user });
        }
        catch (err) {
            res.status(400).json({
                status: "fail",
                message: err,
            });
        }
    }
    async getUsers(req, res, next) {
        try {
            const handler = new user_handler_1.UserHandler();
            const users = await handler.getUsers(req.query);
            res.status(200).json({
                status: "success",
                data: { users },
            });
        }
        catch (err) {
            return res.status(400).json({ status: "fail", message: err });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map