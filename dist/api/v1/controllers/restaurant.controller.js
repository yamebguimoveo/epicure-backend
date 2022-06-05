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
exports.RestaurantController = void 0;
var express_1 = require("express");
var restaurant_handler_1 = require("../handlers/restaurant.handler");
var authenticator_1 = require("../middlewares/authenticator");
var RestaurantController = /** @class */ (function () {
    function RestaurantController() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    RestaurantController.prototype.initializeRoutes = function () {
        this.router
            .route("/")
            .get(this.getRestaurants.bind(this))
            .post(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.createRestaurant.bind(this));
        this.router
            .route("/:id")
            .get(this.getRestaurant.bind(this))["delete"](authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.deleteRestaurant.bind(this))
            .patch(authenticator_1.Authenticator.protect, authenticator_1.Authenticator.restrictToAdmin, this.updateRestaurant.bind(this));
    };
    RestaurantController.prototype.getRestaurants = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var handler, restaurants, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        handler = new restaurant_handler_1.RestaurantHandler();
                        return [4 /*yield*/, handler.getRestaurants(req.query)];
                    case 1:
                        restaurants = _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: { restaurants: restaurants }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res
                            .status(400)
                            .json({ status: "fail", message: "could not get restaurants" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.createRestaurant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var handler, restaurant, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        handler = new restaurant_handler_1.RestaurantHandler();
                        return [4 /*yield*/, handler.createRestaurant(req.body)];
                    case 1:
                        restaurant = _a.sent();
                        res.status(201).json({
                            status: "success",
                            data: { restaurant: restaurant }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res
                            .status(400)
                            .json({ status: "fail", message: "could not create restaurant" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.getRestaurant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, handler, restaurant, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        handler = new restaurant_handler_1.RestaurantHandler();
                        return [4 /*yield*/, handler.getRestaurant(id)];
                    case 1:
                        restaurant = _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: { restaurant: restaurant }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res
                            .status(404)
                            .json({ status: "fail", message: "could not get restaurant" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.deleteRestaurant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, handler, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        handler = new restaurant_handler_1.RestaurantHandler();
                        return [4 /*yield*/, handler.deleteRestaurant(id)];
                    case 1:
                        _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: { restaurant: id }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res
                            .status(404)
                            .json({ status: "fail", message: "could not delete restaurant" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.updateRestaurant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, handler, restaurant, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        handler = new restaurant_handler_1.RestaurantHandler();
                        return [4 /*yield*/, handler.updateRestaurant(id, req.body)];
                    case 1:
                        restaurant = _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: { restaurant: restaurant }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res
                            .status(404)
                            .json({ status: "fail", message: "could not update restaurant" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RestaurantController;
}());
exports.RestaurantController = RestaurantController;
