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
exports.ChefHandler = void 0;
const chef_model_1 = require("../../../db/models/chef.model");
const ApiFeatures_1 = require("../utils/ApiFeatures");
class ChefHandler {
    getChefs(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = chef_model_1.Chef.find();
                const features = new ApiFeatures_1.APIFeatures(query, reqQuery)
                    .filter()
                    .sort()
                    .limitFields()
                    .paginate();
                const chefs = yield query;
                return chefs;
            }
            catch (err) {
                throw err;
            }
        });
    }
    createChef(chef) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newChef = yield chef_model_1.Chef.create(chef);
                return newChef;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getChef(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chef = yield chef_model_1.Chef.findById(id);
                return chef;
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteChef(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chef = yield chef_model_1.Chef.findByIdAndDelete(id);
                return chef;
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateChef(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newChef = yield chef_model_1.Chef.findByIdAndUpdate(id, update, { new: true });
                return newChef;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.ChefHandler = ChefHandler;
//# sourceMappingURL=chef.handler.js.map