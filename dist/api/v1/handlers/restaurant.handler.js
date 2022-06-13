"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantHandler = void 0;
const restaurant_model_1 = require("../../../db/models/restaurant.model");
const utils_1 = require("../utils");
const ApiFeatures_1 = require("../utils/ApiFeatures");
const restaurantsFilter_1 = require("../utils/restaurantsFilter");
// require("../../../db/models/chef.model.ts");
class RestaurantHandler {
    async updateRestaurantAvailavle() {
        try {
            const allRestaurants = await restaurant_model_1.Restaurant.find({});
            const restaurantsOpenID = (0, restaurantsFilter_1.openRestaurantsFilterFunc)(true, allRestaurants);
            await restaurant_model_1.Restaurant.updateMany({ isOpen: true }, { isOpen: false });
            restaurantsOpenID.forEach(async (id) => {
                console.log(id + "$$$$");
                await restaurant_model_1.Restaurant.findByIdAndUpdate(id._id, { isOpen: true });
            });
            return restaurantsOpenID;
        }
        catch (err) {
            throw err;
        }
    }
    async getRestaurants(reqQuery) {
        try {
            console.log(reqQuery, "\n this is request query ");
            let query = restaurant_model_1.Restaurant.find();
            new ApiFeatures_1.APIFeatures(query, reqQuery).filter().sort().limitFields().paginate();
            let restaurants = await query.populate("chef");
            let count = await restaurant_model_1.Restaurant.count((0, utils_1.removeProperties)(reqQuery));
            return { restaurants, count };
        }
        catch (err) {
            console.log(err);
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