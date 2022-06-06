"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantHandler = void 0;
const restaurant_model_1 = require("../../../db/models/restaurant.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
// require("../../../db/models/chef.model.ts");
class RestaurantHandler {
    async getRestaurants(reqQuery) {
        try {
            console.log(reqQuery, "\n this is request query ");
            let query = restaurant_model_1.Restaurant.find();
            new ApiFeatures_1.APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
            const restaurants = await query.populate("chef");
            return restaurants;
        }
        catch (err) {
            throw err;
        }
    }
    async createRestaurant(dish) {
        try {
            const newRestaurant = await restaurant_model_1.Restaurant.create(dish);
            return newRestaurant;
        }
        catch (err) {
            throw err;
        }
    }
    async getRestaurant(id) {
        try {
            const restaurant = await restaurant_model_1.Restaurant.findById(id).populate({
                path: "chef",
                select: "_id name",
            });
            return restaurant;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteRestaurant(id) {
        try {
            const restaurant = await restaurant_model_1.Restaurant.findByIdAndDelete(id).populate({
                path: "chef",
                select: "name _id",
            });
            return restaurant;
        }
        catch (err) {
            throw err;
        }
    }
    async updateRestaurant(id, update) {
        try {
            const newRestaurant = await restaurant_model_1.Restaurant.findByIdAndUpdate(id, update, {
                new: true,
            }).populate({ path: "chef", select: "name _id" });
            return newRestaurant;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.RestaurantHandler = RestaurantHandler;
//# sourceMappingURL=restaurant.handler.js.map