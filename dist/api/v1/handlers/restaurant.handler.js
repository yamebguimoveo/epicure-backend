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
exports.RestaurantHandler = void 0;
const restaurant_model_1 = require("../../../db/models/restaurant.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
require("../../../db/models/chef.model.ts");
class RestaurantHandler {
    getRestaurants(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(reqQuery, "\n this is request query ");
                let query = restaurant_model_1.Restaurant.find();
                new ApiFeatures_1.APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
                const restaurants = yield query.populate("chef");
                return restaurants;
            }
            catch (err) {
                throw err;
            }
        });
    }
    createRestaurant(dish) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRestaurant = yield restaurant_model_1.Restaurant.create(dish);
                return newRestaurant;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getRestaurant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurant = yield restaurant_model_1.Restaurant.findById(id).populate({
                    path: "chef",
                    select: "_id name",
                });
                return restaurant;
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteRestaurant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurant = yield restaurant_model_1.Restaurant.findByIdAndDelete(id).populate({
                    path: "chef",
                    select: "name _id",
                });
                return restaurant;
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateRestaurant(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRestaurant = yield restaurant_model_1.Restaurant.findByIdAndUpdate(id, update, {
                    new: true,
                }).populate({ path: "chef", select: "name _id" });
                return newRestaurant;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.RestaurantHandler = RestaurantHandler;
//# sourceMappingURL=restaurant.handler.js.map