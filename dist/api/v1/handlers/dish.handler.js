"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishHandler = void 0;
const dish_model_1 = require("../../../db/models/dish.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
class DishHandler {
    async getDishes(reqQuery) {
        try {
            let query = dish_model_1.Dish.find();
            const features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            query = query.populate({
                path: "restaurant",
                select: "_id name",
            });
            const dishes = await query;
            return dishes;
        }
        catch (err) {
            throw err;
        }
    }
    async createDish(dish) {
        try {
            const newDish = await dish_model_1.Dish.create(dish);
            return newDish;
        }
        catch (err) {
            throw err;
        }
    }
    async getDish(id) {
        try {
            const newDish = await dish_model_1.Dish.findById(id).populate("restaurant");
            return newDish;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteDish(id) {
        try {
            const newDish = await dish_model_1.Dish.findByIdAndDelete(id);
            return newDish;
        }
        catch (err) {
            throw err;
        }
    }
    async updateDish(id, update) {
        try {
            const newDish = await dish_model_1.Dish.findByIdAndUpdate(id, update, { new: true });
            return newDish;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.DishHandler = DishHandler;
//# sourceMappingURL=dish.handler.js.map