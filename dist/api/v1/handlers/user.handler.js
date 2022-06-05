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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserHandler = void 0;
var user_model_1 = require("../../../db/models/user.model");
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var ApiFeatures_1 = require("../utils/ApiFeatures");
//function that get user and generate jwt for it
var signToken = function (user) {
    return jsonwebtoken_1["default"].sign({ name: user.name, email: user.email }, process.env.JWT_SECRET || "secret", {
        expiresIn: process.env.JWT_EXPIRES_IN || "10m"
    });
};
var UserHandler = /** @class */ (function () {
    function UserHandler() {
    }
    UserHandler.prototype.signup = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, admin, email, name_1, _id, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.User.create(user)];
                    case 1:
                        _a = _b.sent(), admin = _a.admin, email = _a.email, name_1 = _a.name, _id = _a._id;
                        return [2 /*return*/, { admin: admin, email: email, name: name_1, _id: _id }];
                    case 2:
                        err_1 = _b.sent();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserHandler.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var existUser, isCorrectPassword, userData, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1.User.findOne({ email: user.email }).select("+password")];
                    case 1:
                        existUser = _a.sent();
                        if (!existUser || !existUser.password) {
                            throw "Could not find user";
                        }
                        return [4 /*yield*/, bcrypt_1["default"].compare(user.password, existUser.password)];
                    case 2:
                        isCorrectPassword = _a.sent();
                        userData = {
                            name: existUser.name,
                            email: existUser.email,
                            admin: existUser.admin
                        };
                        if (!isCorrectPassword)
                            throw "Incorrect Password";
                        token = signToken(existUser);
                        return [2 /*return*/, { token: token, user: userData }];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserHandler.prototype.getUsers = function (reqQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var query, features, users, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = user_model_1.User.find();
                        features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                            .filter()
                            .sort()
                            .limitFields()
                            .paginate();
                        return [4 /*yield*/, query];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserHandler.prototype.checkIfUserExists = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.User.find({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user.length === 0)
                            return [2 /*return*/, false];
                        return [2 /*return*/, user[0]];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserHandler;
}());
exports.UserHandler = UserHandler;
