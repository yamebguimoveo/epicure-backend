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
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { admin, email, name, _id } = yield user_model_1.User.create(user);
                return { admin, email, name, _id };
            }
            catch (err) {
                throw err;
            }
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existUser = yield user_model_1.User.findOne({ email: user.email }).select("+password");
                if (!existUser || !existUser.password) {
                    throw "Could not find user";
                }
                const isCorrectPassword = yield bcrypt_1.default.compare(user.password, existUser.password);
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
        });
    }
    getUsers(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = user_model_1.User.find();
                const features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
                const users = yield query;
                return users;
            }
            catch (err) {
                throw err;
            }
        });
    }
    checkIfUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.find({ email });
                if (user.length === 0)
                    return false;
                return user[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserHandler = UserHandler;
//# sourceMappingURL=user.handler.js.map