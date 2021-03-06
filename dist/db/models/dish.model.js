"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dish = void 0;
const mongoose_1 = require("mongoose");
const dishSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageSrc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    description: {
        type: String,
    },
    sensitivities: {
        type: [String],
    },
    lunch: {
        type: Boolean,
        default: false,
    },
    breakfast: {
        type: Boolean,
        default: false,
    },
    dinner: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Dish = (0, mongoose_1.model)("Dish", dishSchema);
//# sourceMappingURL=dish.model.js.map