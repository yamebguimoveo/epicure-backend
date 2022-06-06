"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChefHandler = void 0;
const chef_model_1 = require("../../../db/models/chef.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
class ChefHandler {
    async getChefs(reqQuery) {
        try {
            const query = chef_model_1.Chef.find();
            const features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                .filter()
                .sort()
                .limitFields()
                .paginate();
            const chefs = await query;
            return chefs;
        }
        catch (err) {
            throw err;
        }
    }
    async createChef(chef) {
        try {
            const newChef = await chef_model_1.Chef.create(chef);
            return newChef;
        }
        catch (err) {
            throw err;
        }
    }
    async getChef(id) {
        try {
            const chef = await chef_model_1.Chef.findById(id);
            return chef;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteChef(id) {
        try {
            const chef = await chef_model_1.Chef.findByIdAndDelete(id);
            return chef;
        }
        catch (err) {
            throw err;
        }
    }
    async updateChef(id, update) {
        try {
            const newChef = await chef_model_1.Chef.findByIdAndUpdate(id, update, { new: true });
            return newChef;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.ChefHandler = ChefHandler;
//# sourceMappingURL=chef.handler.js.map