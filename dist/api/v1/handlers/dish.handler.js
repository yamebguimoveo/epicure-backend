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
exports.DishHandler = void 0;
const dish_model_1 = require("../../../db/models/dish.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
class DishHandler {
    getDishes(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const dishes = yield query;
                return dishes;
            }
            catch (err) {
                throw err;
            }
        });
    }
    createDish(dish) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDish = yield dish_model_1.Dish.create(dish);
                return newDish;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getDish(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDish = yield dish_model_1.Dish.findById(id).populate("restaurant");
                return newDish;
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteDish(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDish = yield dish_model_1.Dish.findByIdAndDelete(id);
                return newDish;
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateDish(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDish = yield dish_model_1.Dish.findByIdAndUpdate(id, update, { new: true });
                return newDish;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.DishHandler = DishHandler;
//# sourceMappingURL=dish.handler.js.map