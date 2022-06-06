"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const user_model_1 = require("../../../db/models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiFeatures_1 = require("../utils/ApiFeatures");
//function that get user and generate jwt for it
const signToken = (user) => {
    return jsonwebtoken_1.default.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET || "secret", {
        expiresIn: process.env.JWT_EXPIRES_IN || "10m",
    });
};
class UserHandler {
    async signup(user) {
        try {
            const { admin, email, name, _id } = await user_model_1.User.create(user);
            return { admin, email, name, _id };
        }
        catch (err) {
            throw err;
        }
    }
    async login(user) {
        try {
            const existUser = await user_model_1.User.findOne({ email: user.email }).select("+password");
            if (!existUser || !existUser.password) {
                throw "Could not find user";
            }
            const isCorrectPassword = await bcrypt_1.default.compare(user.password, existUser.password);
            const userData = {
                name: existUser.name,
                email: existUser.email,
                admin: existUser.admin,
            };
            if (!isCorrectPassword)
                throw "Incorrect Password";
            const token = signToken(existUser);
            return { token, user: userData };
        }
        catch (err) {
            throw err;
        }
    }
    async getUsers(reqQuery) {
        try {
            let query = user_model_1.User.find();
            const features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const users = await query;
            return users;
        }
        catch (err) {
            throw err;
        }
    }
    async checkIfUserExists(email) {
        try {
            const user = await user_model_1.User.find({ email });
            if (user.length === 0)
                return false;
            return user[0];
        }
        catch (err) {
            throw err;
        }
    }
}
exports.UserHandler = UserHandler;
//# sourceMappingURL=user.handler.js.map